import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
export interface LogHistory20222Attributes {
    id: string;
    log_id?: number;
    created_date: string;
    unix_ts?: number;
    user_id?: number;
    event_name: string;
}
export type LogHistory20222Pk = "id" | "created_date" | "event_name";
export type LogHistory20222Id = LogHistory20222[LogHistory20222Pk];
export type LogHistory20222OptionalAttributes = "log_id" | "created_date" | "unix_ts" | "user_id";
export type LogHistory20222CreationAttributes = Optional<LogHistory20222Attributes, LogHistory20222OptionalAttributes>;
export declare class LogHistory20222 extends Model<LogHistory20222Attributes, LogHistory20222CreationAttributes> implements LogHistory20222Attributes {
    id: string;
    log_id?: number;
    created_date: string;
    unix_ts?: number;
    user_id?: number;
    event_name: string;
    static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory20222;
}
//# sourceMappingURL=LogHistory20222.d.ts.map