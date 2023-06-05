import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
export interface LogHistory20222LoginAttributes {
    id: string;
    log_id?: number;
    created_date: string;
    unix_ts?: number;
    user_id?: number;
    event_name: string;
}
export type LogHistory20222LoginPk = "id" | "created_date" | "event_name";
export type LogHistory20222LoginId = LogHistory20222Login[LogHistory20222LoginPk];
export type LogHistory20222LoginOptionalAttributes = "log_id" | "created_date" | "unix_ts" | "user_id";
export type LogHistory20222LoginCreationAttributes = Optional<LogHistory20222LoginAttributes, LogHistory20222LoginOptionalAttributes>;
export declare class LogHistory20222Login extends Model<LogHistory20222LoginAttributes, LogHistory20222LoginCreationAttributes> implements LogHistory20222LoginAttributes {
    id: string;
    log_id?: number;
    created_date: string;
    unix_ts?: number;
    user_id?: number;
    event_name: string;
    static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory20222Login;
}
//# sourceMappingURL=LogHistory20222Login.d.ts.map