"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.LogHistory20231Logout = exports.LogHistory20231Login = exports.LogHistory20231Default = exports.LogHistory20231 = exports.LogHistory20222Logout = exports.LogHistory20222Login = exports.LogHistory20222Default = exports.LogHistory20222 = exports.LogHistory = exports.SequelizeMetum = void 0;
const SequelizeMetum_1 = require("./SequelizeMetum");
Object.defineProperty(exports, "SequelizeMetum", { enumerable: true, get: function () { return SequelizeMetum_1.SequelizeMetum; } });
const LogHistory_1 = require("./LogHistory");
Object.defineProperty(exports, "LogHistory", { enumerable: true, get: function () { return LogHistory_1.LogHistory; } });
const LogHistory20222_1 = require("./LogHistory20222");
Object.defineProperty(exports, "LogHistory20222", { enumerable: true, get: function () { return LogHistory20222_1.LogHistory20222; } });
const LogHistory20222Default_1 = require("./LogHistory20222Default");
Object.defineProperty(exports, "LogHistory20222Default", { enumerable: true, get: function () { return LogHistory20222Default_1.LogHistory20222Default; } });
const LogHistory20222Login_1 = require("./LogHistory20222Login");
Object.defineProperty(exports, "LogHistory20222Login", { enumerable: true, get: function () { return LogHistory20222Login_1.LogHistory20222Login; } });
const LogHistory20222Logout_1 = require("./LogHistory20222Logout");
Object.defineProperty(exports, "LogHistory20222Logout", { enumerable: true, get: function () { return LogHistory20222Logout_1.LogHistory20222Logout; } });
const LogHistory20231_1 = require("./LogHistory20231");
Object.defineProperty(exports, "LogHistory20231", { enumerable: true, get: function () { return LogHistory20231_1.LogHistory20231; } });
const LogHistory20231Default_1 = require("./LogHistory20231Default");
Object.defineProperty(exports, "LogHistory20231Default", { enumerable: true, get: function () { return LogHistory20231Default_1.LogHistory20231Default; } });
const LogHistory20231Login_1 = require("./LogHistory20231Login");
Object.defineProperty(exports, "LogHistory20231Login", { enumerable: true, get: function () { return LogHistory20231Login_1.LogHistory20231Login; } });
const LogHistory20231Logout_1 = require("./LogHistory20231Logout");
Object.defineProperty(exports, "LogHistory20231Logout", { enumerable: true, get: function () { return LogHistory20231Logout_1.LogHistory20231Logout; } });
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
//# sourceMappingURL=init-models.js.map