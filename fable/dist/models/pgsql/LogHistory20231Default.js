"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogHistory20231Default = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = require("sequelize");
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
//# sourceMappingURL=LogHistory20231Default.js.map