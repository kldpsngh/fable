import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
export interface LogHistory20231DefaultAttributes {
    id: string;
    log_id?: number;
    created_date: string;
    unix_ts?: number;
    user_id?: number;
    event_name: string;
}
export type LogHistory20231DefaultPk = "id" | "created_date" | "event_name";
export type LogHistory20231DefaultId = LogHistory20231Default[LogHistory20231DefaultPk];
export type LogHistory20231DefaultOptionalAttributes = "log_id" | "created_date" | "unix_ts" | "user_id";
export type LogHistory20231DefaultCreationAttributes = Optional<LogHistory20231DefaultAttributes, LogHistory20231DefaultOptionalAttributes>;
export declare class LogHistory20231Default extends Model<LogHistory20231DefaultAttributes, LogHistory20231DefaultCreationAttributes> implements LogHistory20231DefaultAttributes {
    id: string;
    log_id?: number;
    created_date: string;
    unix_ts?: number;
    user_id?: number;
    event_name: string;
    static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory20231Default;
}
//# sourceMappingURL=LogHistory20231Default.d.ts.map