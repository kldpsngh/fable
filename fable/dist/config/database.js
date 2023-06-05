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
exports.DatabaseModels = void 0;
const init_models_1 = require("../models/pgsql/init-models");
const sequelize_1 = require("sequelize");
const typedi_1 = require("typedi");
const envVariable_1 = require("./envVariable");
const redis_1 = require("redis");
let DatabaseModels = class DatabaseModels {
    constructor(ENV_VARIABLES) {
        this.ENV_VARIABLES = ENV_VARIABLES;
        this.sequelize = new sequelize_1.Sequelize(this.ENV_VARIABLES.DB_NAME, this.ENV_VARIABLES.DB_USER, this.ENV_VARIABLES.DB_PASS, {
            host: this.ENV_VARIABLES.DB_HOST,
            port: this.ENV_VARIABLES.DB_PORT,
            dialect: "postgres",
            logging: false
        });
        this.dbModels = (0, init_models_1.initModels)(this.sequelize);
        this.redisConnection = (0, redis_1.createClient)({
            url: `redis://${this.ENV_VARIABLES.REDIS_HOST}:${this.ENV_VARIABLES.REDIS_PORT}`
        })
            .on("connect", () => {
            console.log("Redis Connected");
        })
            .on("error", (err) => {
            console.error("Error connecting to redis : " + err);
        });
    }
};
DatabaseModels = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [envVariable_1.EnvironmentVariables])
], DatabaseModels);
exports.DatabaseModels = DatabaseModels;
//# sourceMappingURL=database.js.map