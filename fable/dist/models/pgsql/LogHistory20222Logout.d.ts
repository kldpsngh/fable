import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
export interface LogHistory20222LogoutAttributes {
    id: string;
    log_id?: number;
    created_date: string;
    unix_ts?: number;
    user_id?: number;
    event_name: string;
}
export type LogHistory20222LogoutPk = "id" | "created_date" | "event_name";
export type LogHistory20222LogoutId = LogHistory20222Logout[LogHistory20222LogoutPk];
export type LogHistory20222LogoutOptionalAttributes = "log_id" | "created_date" | "unix_ts" | "user_id";
export type LogHistory20222LogoutCreationAttributes = Optional<LogHistory20222LogoutAttributes, LogHistory20222LogoutOptionalAttributes>;
export declare class LogHistory20222Logout extends Model<LogHistory20222LogoutAttributes, LogHistory20222LogoutCreationAttributes> implements LogHistory20222LogoutAttributes {
    id: string;
    log_id?: number;
    created_date: string;
    unix_ts?: number;
    user_id?: number;
    event_name: string;
    static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory20222Logout;
}
//# sourceMappingURL=LogHistory20222Logout.d.ts.map