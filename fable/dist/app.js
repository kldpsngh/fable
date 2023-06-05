"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("source-map-support/register");
const express_1 = __importDefault(require("express"));
const typedi_1 = require("typedi");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "500mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
const envVariable_1 = require("./config/envVariable");
const logService_1 = require("./services/logService");
const routes_1 = __importDefault(require("./routes"));
const PORT = typedi_1.Container.get(envVariable_1.EnvironmentVariables).PORT;
app.use("/fable", routes_1.default);
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
let logDirectory = path_1.default.join(__dirname, "/tempLogs");
if (!fs_1.default.existsSync(logDirectory))
    fs_1.default.mkdirSync(logDirectory);
typedi_1.Container.get(logService_1.LogService).logConsumer();
exports.default = app;
//# sourceMappingURL=app.js.map