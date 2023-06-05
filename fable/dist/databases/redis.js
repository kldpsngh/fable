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
exports.RedisDatabase = void 0;
const typedi_1 = require("typedi");
const database_1 = require("../config/database");
const moment_1 = __importDefault(require("moment"));
let RedisDatabase = class RedisDatabase {
    constructor(db) {
        this.db = db;
        this.redisConnection = this.db.redisConnection;
    }
    async readData(key) {
        return new Promise((resolve, reject) => {
            this.redisConnection.get(key, (err, data) => {
                if (err) {
                    return reject(err);
                }
                else {
                    try {
                        return resolve(JSON.parse(data));
                    }
                    catch (error) {
                        return resolve(data);
                    }
                }
            });
        });
    }
    async writeData(key, value, expiresAt) {
        return new Promise((resolve, reject) => {
            if (typeof value !== "string") {
                value = JSON.stringify(value);
            }
            this.redisConnection.set(key, value, (err, data) => {
                if (err) {
                    return reject(err);
                }
                else {
                    if (expiresAt) {
                        this.redisConnection.expireat(key, (0, moment_1.default)(expiresAt).unix());
                    }
                    return resolve(data);
                }
            });
        });
    }
    async deleteKey(key) {
        return new Promise((resolve, reject) => {
            this.redisConnection.del(key, (err, data) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(data);
                }
            });
        });
    }
    async ifKeyExists(key) {
        return new Promise((resolve, reject) => {
            this.redisConnection.exists(key, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
};
RedisDatabase = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [database_1.DatabaseModels])
], RedisDatabase);
exports.RedisDatabase = RedisDatabase;
//# sourceMappingURL=redis.js.map