/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
__webpack_require__(/*! source-map-support/register */ "source-map-support/register");
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const typedi_1 = __webpack_require__(/*! typedi */ "typedi");
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "500mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
const envVariable_1 = __webpack_require__(/*! ./config/envVariable */ "./config/envVariable.ts");
const logService_1 = __webpack_require__(/*! ./services/logService */ "./services/logService.ts");
const routes_1 = __importDefault(__webpack_require__(/*! ./routes */ "./routes/index.ts"));
const PORT = typedi_1.Container.get(envVariable_1.EnvironmentVariables).PORT;
app.use("/fable", routes_1.default);
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
let logDirectory = path_1.default.join(__dirname, "/tempLogs");
if (!fs_1.default.existsSync(logDirectory))
    fs_1.default.mkdirSync(logDirectory);
typedi_1.Container.get(logService_1.LogService).logConsumer();
exports["default"] = app;


/***/ }),

/***/ "./config/database.ts":
/*!****************************!*\
  !*** ./config/database.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModels = void 0;
const init_models_1 = __webpack_require__(/*! ../models/pgsql/init-models */ "./models/pgsql/init-models.ts");
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const typedi_1 = __webpack_require__(/*! typedi */ "typedi");
const envVariable_1 = __webpack_require__(/*! ./envVariable */ "./config/envVariable.ts");
const redis_1 = __webpack_require__(/*! redis */ "redis");
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


/***/ }),

/***/ "./config/envVariable.ts":
/*!*******************************!*\
  !*** ./config/envVariable.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnvironmentVariables = void 0;
const dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
const typedi_1 = __webpack_require__(/*! typedi */ "typedi");
let EnvironmentVariables = class EnvironmentVariables {
    constructor() {
        (0, dotenv_1.config)();
        this.NODE_ENV = "development" || 0;
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


/***/ }),

/***/ "./controllers/index.ts":
/*!******************************!*\
  !*** ./controllers/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.processLog = void 0;
const typedi_1 = __webpack_require__(/*! typedi */ "typedi");
const logService_1 = __webpack_require__(/*! ../services/logService */ "./services/logService.ts");
async function processLog(req, res) {
    try {
        if (!req.body)
            return res.status(400).send("Bad Request");
        await typedi_1.Container.get(logService_1.LogService).saveLog(req.body);
        res.status(201).send("Saved");
    }
    catch (ex) {
        console.error(ex);
        return res.sendStatus(500);
    }
}
exports.processLog = processLog;


/***/ }),

/***/ "./databases/logHistory.ts":
/*!*********************************!*\
  !*** ./databases/logHistory.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogHistoryDatabase = void 0;
const typedi_1 = __webpack_require__(/*! typedi */ "typedi");
const database_1 = __webpack_require__(/*! ../config/database */ "./config/database.ts");
let LogHistoryDatabase = class LogHistoryDatabase {
    constructor(db) {
        this.db = db;
        this.logHistoryModel = this.db.dbModels.LogHistory;
    }
    save(logData) {
        return this.logHistoryModel.create(logData);
    }
    bulkSave(logData, transaction) {
        return this.logHistoryModel.bulkCreate(logData, {
            transaction
        });
    }
    getTransaction() {
        return this.db.sequelize.transaction();
    }
};
LogHistoryDatabase = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [database_1.DatabaseModels])
], LogHistoryDatabase);
exports.LogHistoryDatabase = LogHistoryDatabase;


/***/ }),

/***/ "./databases/redis.ts":
/*!****************************!*\
  !*** ./databases/redis.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisDatabase = void 0;
const typedi_1 = __webpack_require__(/*! typedi */ "typedi");
const database_1 = __webpack_require__(/*! ../config/database */ "./config/database.ts");
const moment_1 = __importDefault(__webpack_require__(/*! moment */ "moment"));
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


/***/ }),

/***/ "./models/pgsql/LogHistory.ts":
/*!************************************!*\
  !*** ./models/pgsql/LogHistory.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogHistory = void 0;
const Sequelize = __importStar(__webpack_require__(/*! sequelize */ "sequelize"));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
class LogHistory extends sequelize_1.Model {
    static initModel(sequelize) {
        return LogHistory.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            log_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            created_date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
                primaryKey: true
            },
            unix_ts: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            event_name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'log_history',
            schema: 'public',
            timestamps: false
        });
    }
}
exports.LogHistory = LogHistory;


/***/ }),

/***/ "./models/pgsql/LogHistory20222.ts":
/*!*****************************************!*\
  !*** ./models/pgsql/LogHistory20222.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogHistory20222 = void 0;
const Sequelize = __importStar(__webpack_require__(/*! sequelize */ "sequelize"));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
class LogHistory20222 extends sequelize_1.Model {
    static initModel(sequelize) {
        return LogHistory20222.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            log_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            created_date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
                primaryKey: true
            },
            unix_ts: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            event_name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'log_history_2022_2',
            schema: 'public',
            timestamps: false
        });
    }
}
exports.LogHistory20222 = LogHistory20222;


/***/ }),

/***/ "./models/pgsql/LogHistory20222Default.ts":
/*!************************************************!*\
  !*** ./models/pgsql/LogHistory20222Default.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogHistory20222Default = void 0;
const Sequelize = __importStar(__webpack_require__(/*! sequelize */ "sequelize"));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
class LogHistory20222Default extends sequelize_1.Model {
    static initModel(sequelize) {
        return LogHistory20222Default.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            log_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            created_date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
                primaryKey: true
            },
            unix_ts: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            event_name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'log_history_2022_2_default',
            schema: 'public',
            timestamps: false
        });
    }
}
exports.LogHistory20222Default = LogHistory20222Default;


/***/ }),

/***/ "./models/pgsql/LogHistory20222Login.ts":
/*!**********************************************!*\
  !*** ./models/pgsql/LogHistory20222Login.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogHistory20222Login = void 0;
const Sequelize = __importStar(__webpack_require__(/*! sequelize */ "sequelize"));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
class LogHistory20222Login extends sequelize_1.Model {
    static initModel(sequelize) {
        return LogHistory20222Login.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            log_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            created_date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
                primaryKey: true
            },
            unix_ts: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            event_name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'log_history_2022_2_login',
            schema: 'public',
            timestamps: false
        });
    }
}
exports.LogHistory20222Login = LogHistory20222Login;


/***/ }),

/***/ "./models/pgsql/LogHistory20222Logout.ts":
/*!***********************************************!*\
  !*** ./models/pgsql/LogHistory20222Logout.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogHistory20222Logout = void 0;
const Sequelize = __importStar(__webpack_require__(/*! sequelize */ "sequelize"));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
class LogHistory20222Logout extends sequelize_1.Model {
    static initModel(sequelize) {
        return LogHistory20222Logout.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            log_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            created_date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
                primaryKey: true
            },
            unix_ts: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            event_name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'log_history_2022_2_logout',
            schema: 'public',
            timestamps: false
        });
    }
}
exports.LogHistory20222Logout = LogHistory20222Logout;


/***/ }),

/***/ "./models/pgsql/LogHistory20231.ts":
/*!*****************************************!*\
  !*** ./models/pgsql/LogHistory20231.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogHistory20231 = void 0;
const Sequelize = __importStar(__webpack_require__(/*! sequelize */ "sequelize"));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
class LogHistory20231 extends sequelize_1.Model {
    static initModel(sequelize) {
        return LogHistory20231.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            log_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            created_date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
                primaryKey: true
            },
            unix_ts: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            event_name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'log_history_2023_1',
            schema: 'public',
            timestamps: false
        });
    }
}
exports.LogHistory20231 = LogHistory20231;


/***/ }),

/***/ "./models/pgsql/LogHistory20231Default.ts":
/*!************************************************!*\
  !*** ./models/pgsql/LogHistory20231Default.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogHistory20231Default = void 0;
const Sequelize = __importStar(__webpack_require__(/*! sequelize */ "sequelize"));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
class LogHistory20231Default extends sequelize_1.Model {
    static initModel(sequelize) {
        return LogHistory20231Default.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            log_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            created_date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
                primaryKey: true
            },
            unix_ts: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            event_name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'log_history_2023_1_default',
            schema: 'public',
            timestamps: false
        });
    }
}
exports.LogHistory20231Default = LogHistory20231Default;


/***/ }),

/***/ "./models/pgsql/LogHistory20231Login.ts":
/*!**********************************************!*\
  !*** ./models/pgsql/LogHistory20231Login.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogHistory20231Login = void 0;
const Sequelize = __importStar(__webpack_require__(/*! sequelize */ "sequelize"));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
class LogHistory20231Login extends sequelize_1.Model {
    static initModel(sequelize) {
        return LogHistory20231Login.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            log_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            created_date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
                primaryKey: true
            },
            unix_ts: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            event_name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'log_history_2023_1_login',
            schema: 'public',
            timestamps: false
        });
    }
}
exports.LogHistory20231Login = LogHistory20231Login;


/***/ }),

/***/ "./models/pgsql/LogHistory20231Logout.ts":
/*!***********************************************!*\
  !*** ./models/pgsql/LogHistory20231Logout.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogHistory20231Logout = void 0;
const Sequelize = __importStar(__webpack_require__(/*! sequelize */ "sequelize"));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
class LogHistory20231Logout extends sequelize_1.Model {
    static initModel(sequelize) {
        return LogHistory20231Logout.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            log_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            created_date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
                primaryKey: true
            },
            unix_ts: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            event_name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'log_history_2023_1_logout',
            schema: 'public',
            timestamps: false
        });
    }
}
exports.LogHistory20231Logout = LogHistory20231Logout;


/***/ }),

/***/ "./models/pgsql/SequelizeMetum.ts":
/*!****************************************!*\
  !*** ./models/pgsql/SequelizeMetum.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SequelizeMetum = void 0;
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
class SequelizeMetum extends sequelize_1.Model {
    static initModel(sequelize) {
        return SequelizeMetum.init({
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            }
        }, {
            sequelize,
            tableName: 'SequelizeMeta',
            schema: 'public',
            timestamps: false
        });
    }
}
exports.SequelizeMetum = SequelizeMetum;


/***/ }),

/***/ "./models/pgsql/init-models.ts":
/*!*************************************!*\
  !*** ./models/pgsql/init-models.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initModels = exports.LogHistory20231Logout = exports.LogHistory20231Login = exports.LogHistory20231Default = exports.LogHistory20231 = exports.LogHistory20222Logout = exports.LogHistory20222Login = exports.LogHistory20222Default = exports.LogHistory20222 = exports.LogHistory = exports.SequelizeMetum = void 0;
const SequelizeMetum_1 = __webpack_require__(/*! ./SequelizeMetum */ "./models/pgsql/SequelizeMetum.ts");
Object.defineProperty(exports, "SequelizeMetum", ({ enumerable: true, get: function () { return SequelizeMetum_1.SequelizeMetum; } }));
const LogHistory_1 = __webpack_require__(/*! ./LogHistory */ "./models/pgsql/LogHistory.ts");
Object.defineProperty(exports, "LogHistory", ({ enumerable: true, get: function () { return LogHistory_1.LogHistory; } }));
const LogHistory20222_1 = __webpack_require__(/*! ./LogHistory20222 */ "./models/pgsql/LogHistory20222.ts");
Object.defineProperty(exports, "LogHistory20222", ({ enumerable: true, get: function () { return LogHistory20222_1.LogHistory20222; } }));
const LogHistory20222Default_1 = __webpack_require__(/*! ./LogHistory20222Default */ "./models/pgsql/LogHistory20222Default.ts");
Object.defineProperty(exports, "LogHistory20222Default", ({ enumerable: true, get: function () { return LogHistory20222Default_1.LogHistory20222Default; } }));
const LogHistory20222Login_1 = __webpack_require__(/*! ./LogHistory20222Login */ "./models/pgsql/LogHistory20222Login.ts");
Object.defineProperty(exports, "LogHistory20222Login", ({ enumerable: true, get: function () { return LogHistory20222Login_1.LogHistory20222Login; } }));
const LogHistory20222Logout_1 = __webpack_require__(/*! ./LogHistory20222Logout */ "./models/pgsql/LogHistory20222Logout.ts");
Object.defineProperty(exports, "LogHistory20222Logout", ({ enumerable: true, get: function () { return LogHistory20222Logout_1.LogHistory20222Logout; } }));
const LogHistory20231_1 = __webpack_require__(/*! ./LogHistory20231 */ "./models/pgsql/LogHistory20231.ts");
Object.defineProperty(exports, "LogHistory20231", ({ enumerable: true, get: function () { return LogHistory20231_1.LogHistory20231; } }));
const LogHistory20231Default_1 = __webpack_require__(/*! ./LogHistory20231Default */ "./models/pgsql/LogHistory20231Default.ts");
Object.defineProperty(exports, "LogHistory20231Default", ({ enumerable: true, get: function () { return LogHistory20231Default_1.LogHistory20231Default; } }));
const LogHistory20231Login_1 = __webpack_require__(/*! ./LogHistory20231Login */ "./models/pgsql/LogHistory20231Login.ts");
Object.defineProperty(exports, "LogHistory20231Login", ({ enumerable: true, get: function () { return LogHistory20231Login_1.LogHistory20231Login; } }));
const LogHistory20231Logout_1 = __webpack_require__(/*! ./LogHistory20231Logout */ "./models/pgsql/LogHistory20231Logout.ts");
Object.defineProperty(exports, "LogHistory20231Logout", ({ enumerable: true, get: function () { return LogHistory20231Logout_1.LogHistory20231Logout; } }));
function initModels(sequelize) {
    const SequelizeMetum = SequelizeMetum_1.SequelizeMetum.initModel(sequelize);
    const LogHistory = LogHistory_1.LogHistory.initModel(sequelize);
    const LogHistory20222 = LogHistory20222_1.LogHistory20222.initModel(sequelize);
    const LogHistory20222Default = LogHistory20222Default_1.LogHistory20222Default.initModel(sequelize);
    const LogHistory20222Login = LogHistory20222Login_1.LogHistory20222Login.initModel(sequelize);
    const LogHistory20222Logout = LogHistory20222Logout_1.LogHistory20222Logout.initModel(sequelize);
    const LogHistory20231 = LogHistory20231_1.LogHistory20231.initModel(sequelize);
    const LogHistory20231Default = LogHistory20231Default_1.LogHistory20231Default.initModel(sequelize);
    const LogHistory20231Login = LogHistory20231Login_1.LogHistory20231Login.initModel(sequelize);
    const LogHistory20231Logout = LogHistory20231Logout_1.LogHistory20231Logout.initModel(sequelize);
    return {
        SequelizeMetum: SequelizeMetum,
        LogHistory: LogHistory,
        LogHistory20222: LogHistory20222,
        LogHistory20222Default: LogHistory20222Default,
        LogHistory20222Login: LogHistory20222Login,
        LogHistory20222Logout: LogHistory20222Logout,
        LogHistory20231: LogHistory20231,
        LogHistory20231Default: LogHistory20231Default,
        LogHistory20231Login: LogHistory20231Login,
        LogHistory20231Logout: LogHistory20231Logout,
    };
}
exports.initModels = initModels;


/***/ }),

/***/ "./routes/index.ts":
/*!*************************!*\
  !*** ./routes/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const router = (0, express_1.Router)();
const controllers_1 = __webpack_require__(/*! ../controllers */ "./controllers/index.ts");
router.get("/server-alive", (req, res) => {
    res.status(200).send("It's alive");
});
router.post("/log", controllers_1.processLog);
exports["default"] = router;


/***/ }),

/***/ "./services/logService.ts":
/*!********************************!*\
  !*** ./services/logService.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogService = void 0;
const typedi_1 = __webpack_require__(/*! typedi */ "typedi");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const logHistory_1 = __webpack_require__(/*! ../databases/logHistory */ "./databases/logHistory.ts");
const redis_1 = __webpack_require__(/*! ../databases/redis */ "./databases/redis.ts");
const envVariable_1 = __webpack_require__(/*! ../config/envVariable */ "./config/envVariable.ts");
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
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


/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("moment");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/***/ ((module) => {

module.exports = require("redis");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("source-map-support/register");

/***/ }),

/***/ "typedi":
/*!*************************!*\
  !*** external "typedi" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("typedi");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map