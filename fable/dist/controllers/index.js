"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processLog = void 0;
const typedi_1 = require("typedi");
const logService_1 = require("../services/logService");
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
//# sourceMappingURL=index.js.map