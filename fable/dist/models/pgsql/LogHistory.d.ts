import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
export interface LogHistoryAttributes {
    id: string;
    log_id?: number;
    created_date: string;
    unix_ts?: number;
    user_id?: number;
    event_name: string;
}
export type LogHistoryPk = "id" | "created_date" | "event_name";
export type LogHistoryId = LogHistory[LogHistoryPk];
export type LogHistoryOptionalAttributes = "log_id" | "created_date" | "unix_ts" | "user_id";
export type LogHistoryCreationAttributes = Optional<LogHistoryAttributes, LogHistoryOptionalAttributes>;
export declare class LogHistory extends Model<LogHistoryAttributes, LogHistoryCreationAttributes> implements LogHistoryAttributes {
    id: string;
    log_id?: number;
    created_date: string;
    unix_ts?: number;
    user_id?: number;
    event_name: string;
    static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory;
}
//# sourceMappingURL=LogHistory.d.ts.map