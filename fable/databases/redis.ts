import { Service } from "typedi";
import { DatabaseModels } from "../config/database";
import moment from "moment";

@Service()
export class RedisDatabase {
    private redisConnection;
    constructor(private readonly db: DatabaseModels) {
        this.redisConnection = this.db.redisConnection;
    }

    async readData(key: string) {
        return new Promise<any>((resolve, reject) => {
            this.redisConnection.get(key, (err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    try {
                        return resolve(JSON.parse(data!));
                    } catch (error) {
                        return resolve(data);
                    }
                }
            });
        });
    }

    async writeData(key: string, value: any, expiresAt?: Date) {
        return new Promise<"OK">((resolve, reject) => {
            if (typeof value !== "string") {
                value = JSON.stringify(value);
            }
            this.redisConnection.set(key, value, (err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    if (expiresAt) {
                        this.redisConnection.expireat(key, moment(expiresAt).unix());
                    }
                    return resolve(data);
                }
            });
        });
    }

    async deleteKey(key: string) {
        return new Promise<number>((resolve, reject) => {
            this.redisConnection.del(key, (err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        });
    }

    // 1 for hit , 0 for miss
    async ifKeyExists(key: string) {
        return new Promise((resolve, reject) => {
            this.redisConnection.exists(key, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}
