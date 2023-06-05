"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const typedi_1 = require("typedi");
const uuid_1 = require("uuid");
const logHistory_1 = require("../databases/logHistory");
const redis_1 = require("../databases/redis");
const envVariable_1 = require("../config/envVariable");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let LogService = class LogService {
    constructor(logHistoryDatabase, redisDatabase, envVariables) {
        this.logHistoryDatabase = logHistoryDatabase;
        this.redisDatabase = redisDatabase;
        this.envVariables = envVariables;
    }
    async saveLog(logData) {
        let id = (0, uuid_1.v4)();
        let filePath = path_1.default.join(__dirname, `/tempLogs/${id}.json`);
        let logObject = {
            log_id: logData.id,
            unix_ts: logData.unix_ts,
            user_id: logData.user_id,
            event_name: logData.event_name,
            id: id
        };
        await this.redisDatabase.writeData(filePath, "1");
        await new Promise((resolve, reject) => {
            fs_1.default.writeFile(filePath, JSON.stringify(logObject), async (err) => {
                if (err)
                    return reject(err);
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
        let trx = null;
        try {
            let directoryPath = path_1.default.join(__dirname, "/tempLogs");
            let allFiles = await new Promise(async (resolve, reject) => {
                fs_1.default.readdir(directoryPath, (err, files) => {
                    if (err)
                        reject(err);
                    else
                        resolve(files);
                });
            });
            while (allFiles.length > 0) {
                let files = allFiles.splice(0, this.envVariables.FILE_READ_PER_INTERVAL);
                let promiseArr = [];
                let logData = [];
                let filesToBeDeleted = [];
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    let filePath = path_1.default.join(directoryPath, file);
                    if (await this.redisDatabase.ifKeyExists(file.split('.')[0]) === 1)
                        return;
                    promiseArr.push(new Promise((resolve, reject) => {
                        fs_1.default.readFile(filePath, "utf8", (err, data) => {
                            if (err)
                                reject(err);
                            else
                                resolve({ filePath: filePath, data: JSON.parse(data) });
                        });
                    }));
                }
                let results = await Promise.allSettled(promiseArr);
                results.forEach((result) => {
                    if (result.status === "fulfilled") {
                        logData.push(result.value.data);
                        filesToBeDeleted.push(result.value.filePath);
                    }
                    else if (result.status === "rejected") {
                        console.error("Error:", result.reason);
                    }
                });
                trx = await this.logHistoryDatabase.getTransaction();
                if (logData.length > 0)
                    await this.logHistoryDatabase.bulkSave(logData, trx);
                let fileDeletePromises = [];
                filesToBeDeleted.forEach((filePath) => {
                    fileDeletePromises.push(new Promise((resolve, reject) => {
                        fs_1.default.unlink(filePath, (err) => {
                            if (err)
                                return reject(err);
                            resolve(true);
                        });
                    }));
                });
                await Promise.all(fileDeletePromises);
                await trx?.commit();
            }
        }
        catch (ex) {
            await trx?.rollback();
            console.error(ex);
        }
    }
};
LogService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [logHistory_1.LogHistoryDatabase,
        redis_1.RedisDatabase,
        envVariable_1.EnvironmentVariables])
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=logService.js.map