import { Service } from "typedi";
import { LogRequest } from "../models/logRequest";
import { v4 as uuid } from "uuid";
import { LogHistoryDatabase } from "../databases/logHistory";
import { RedisDatabase } from "../databases/redis";
import { EnvironmentVariables } from "../config/envVariable";
import { LogHistoryCreationAttributes } from "../models/pgsql/LogHistory";
import {Transaction} from "sequelize";
import fs from "fs";
import path from "path";

@Service()
export class LogService {
    constructor(
        private readonly logHistoryDatabase: LogHistoryDatabase,
        private readonly redisDatabase: RedisDatabase,
        private readonly envVariables: EnvironmentVariables
    ) {}
    async saveLog(logData: LogRequest) {
        let id = uuid();
        let filePath = path.join(__dirname, `/tempLogs/${id}.json`);
        let logObject = {
            log_id: logData.id,
            unix_ts: logData.unix_ts,
            user_id: logData.user_id,
            event_name: logData.event_name,
            id: id
        };
        await this.redisDatabase.writeData(filePath, "1");
        //in case of server crash , we can setup expiry in keys ...
        await new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(logObject), async (err) => {
                if (err) return reject(err);
                console.log(`File Written Successfully = ${filePath}`);
                await this.redisDatabase.deleteKey(filePath);
                resolve(true);
            });
        });
    }

    async logConsumer() {
        console.log("Starting consumer");
        setInterval(async () => {
            await this.processInBatch();
        }, this.envVariables.CONSUMER_TIME_INTERVAL);
    }

    async processInBatch() {
        console.log("Running batch processor");
        let trx: Transaction | null = null;
        try {
            //read all files from directory
            let directoryPath = path.join(__dirname, "/tempLogs");
            let allFiles: string[] = await new Promise(async (resolve, reject) => {
                fs.readdir(directoryPath, (err, files) => {
                    if (err) reject(err);
                    else resolve(files);
                });
            });
            while (allFiles.length > 0) {
                //isme files read kr .. and db me entry kr ...
                let files = allFiles.splice(0, this.envVariables.FILE_READ_PER_INTERVAL);
                let promiseArr: any = [];
                let logData: LogHistoryCreationAttributes[] = [];
                let filesToBeDeleted : string[] = [];
                //need to use await convert to traditional loop ...

                for(let i = 0; i < files.length; i++){
                    let file = files[i];
                    let filePath = path.join(directoryPath, file);
                    if(await this.redisDatabase.ifKeyExists(file.split('.')[0]) === 1)
                        return;
                    promiseArr.push(
                        new Promise((resolve, reject) => {
                            fs.readFile(filePath, "utf8", (err, data) => {
                                if (err) reject(err);
                                else resolve({filePath: filePath, data : JSON.parse(data)});
                            });
                        })
                    );
                }

                let results = await Promise.allSettled(promiseArr);
                results.forEach((result) => {
                    if (result.status === "fulfilled") {
                        logData.push(result.value.data);
                        filesToBeDeleted.push(result.value.filePath);
                    } else if (result.status === "rejected") {
                        console.error("Error:", result.reason);
                    }
                });
                // use transaction here .. wait until successfull files have been deleted and then commit the transaction ...
                trx = await this.logHistoryDatabase.getTransaction();
                if(logData.length > 0)
                    await this.logHistoryDatabase.bulkSave(logData, trx!);
                //those files need to be deleted ...
                let fileDeletePromises : any = [];
                filesToBeDeleted.forEach((filePath) => {
                    fileDeletePromises.push(
                        new Promise((resolve,reject) => {
                            fs.unlink(filePath,(err) => {
                                if(err)
                                    return reject(err);
                                resolve(true);
                            });
                        })
                    )
                });
                await Promise.all(fileDeletePromises);
                //commit transaction here ....
                await trx?.commit();
            }
        } catch (ex) {
            await trx?.rollback();
            console.error(ex);
            //logging to s3 or elk ...
        }
    }
}
