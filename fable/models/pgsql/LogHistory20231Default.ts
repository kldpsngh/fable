import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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

export class LogHistory20231Default extends Model<LogHistory20231DefaultAttributes, LogHistory20231DefaultCreationAttributes> implements LogHistory20231DefaultAttributes {
  id!: string;
  log_id?: number;
  created_date!: string;
  unix_ts?: number;
  user_id?: number;
  event_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory20231Default {
    return LogHistory20231Default.init({
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
    tableName: 'log_history_2023_1_default',
    schema: 'public',
    timestamps: false
  });
  }
}
