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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentVariables = void 0;
const dotenv_1 = require("dotenv");
const typedi_1 = require("typedi");
let EnvironmentVariables = class EnvironmentVariables {
    constructor() {
        (0, dotenv_1.config)();
        this.NODE_ENV = process.env.NODE_ENV || "development";
        this.DB_USER = process.env.DB_USER;
        this.DB_PASS = process.env.DB_PASS;
        this.DB_NAME = process.env.DB_NAME;
        this.DB_HOST = process.env.DB_HOST;
        this.DB_PORT = Number(process.env.DB_PORT || "5432");
        this.TIMEZONE = process.env.TIMEZONE || "Asia/Kolkata";
        this.PORT = Number(process.env.PORT || "8000");
        this.REDIS_HOST = process.env.REDIS_HOST || "localhost";
        this.REDIS_PORT = Number(process.env.REDIS_PORT || "63790");
        this.CONSUMER_TIME_INTERVAL = Number(process.env.CONSUMER_TIME_INTERVAL || "3000");
        this.FILE_READ_PER_INTERVAL = Number(process.env.FILE_READ_PER_INTERVAL || "20");
    }
};
EnvironmentVariables = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], EnvironmentVariables);
exports.EnvironmentVariables = EnvironmentVariables;
//# sourceMappingURL=envVariable.js.map