"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_auto_1 = __importDefault(require("sequelize-auto"));
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const isWindows = process.platform == "win32";
const envBasePath = module.path.split(`${isWindows ? "\\" : "/"}node_modules`)[0];
const envPath = (0, path_1.join)(envBasePath, ".env");
(0, dotenv_1.config)({ path: envPath });
const auto = new sequelize_auto_1.default(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    directory: "./models/pgsql",
    port: Number(process.env.DB_PORT || "5432"),
    caseModel: "p",
    caseFile: "p",
    singularize: true,
    noAlias: true,
    additional: {},
    lang: "ts",
    useDefine: false,
    noIndexes: true
});
auto.run()
    .then(() => console.info("DB Models Generated"))
    .catch(console.error);
//# sourceMappingURL=generate-models.js.map