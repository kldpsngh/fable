import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
export interface LogHistory20222DefaultAttributes {
    id: string;
    log_id?: number;
    created_date: string;
    unix_ts?: number;
    user_id?: number;
    event_name: string;
}
export type LogHistory20222DefaultPk = "id" | "created_date" | "event_name";
export type LogHistory20222DefaultId = LogHistory20222Default[LogHistory20222DefaultPk];
export type LogHistory20222DefaultOptionalAttributes = "log_id" | "created_date" | "unix_ts" | "user_id";
export type LogHistory20222DefaultCreationAttributes = Optional<LogHistory20222DefaultAttributes, LogHistory20222DefaultOptionalAttributes>;
export declare class LogHistory20222Default extends Model<LogHistory20222DefaultAttributes, LogHistory20222DefaultCreationAttributes> implements LogHistory20222DefaultAttributes {
    id: string;
    log_id?: number;
    created_date: string;
    unix_ts?: number;
    user_id?: number;
    event_name: string;
    static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory20222Default;
}
//# sourceMappingURL=LogHistory20222Default.d.ts.map