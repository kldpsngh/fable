import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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

export class LogHistory20222Login extends Model<LogHistory20222LoginAttributes, LogHistory20222LoginCreationAttributes> implements LogHistory20222LoginAttributes {
  id!: string;
  log_id?: number;
  created_date!: string;
  unix_ts?: number;
  user_id?: number;
  event_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory20222Login {
    return LogHistory20222Login.init({
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
    tableName: 'log_history_2022_2_login',
    schema: 'public',
    timestamps: false
  });
  }
}
