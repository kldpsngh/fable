import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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

export class LogHistory extends Model<LogHistoryAttributes, LogHistoryCreationAttributes> implements LogHistoryAttributes {
  id!: string;
  log_id?: number;
  created_date!: string;
  unix_ts?: number;
  user_id?: number;
  event_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory {
    return LogHistory.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    log_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
      primaryKey: true
    },
    unix_ts: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    event_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'log_history',
    schema: 'public',
    timestamps: false
  });
  }
}
