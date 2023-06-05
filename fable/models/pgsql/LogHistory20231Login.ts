import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface LogHistory20231LoginAttributes {
  id: string;
  log_id?: number;
  created_date: string;
  unix_ts?: number;
  user_id?: number;
  event_name: string;
}

export type LogHistory20231LoginPk = "id" | "created_date" | "event_name";
export type LogHistory20231LoginId = LogHistory20231Login[LogHistory20231LoginPk];
export type LogHistory20231LoginOptionalAttributes = "log_id" | "created_date" | "unix_ts" | "user_id";
export type LogHistory20231LoginCreationAttributes = Optional<LogHistory20231LoginAttributes, LogHistory20231LoginOptionalAttributes>;

export class LogHistory20231Login extends Model<LogHistory20231LoginAttributes, LogHistory20231LoginCreationAttributes> implements LogHistory20231LoginAttributes {
  id!: string;
  log_id?: number;
  created_date!: string;
  unix_ts?: number;
  user_id?: number;
  event_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory20231Login {
    return LogHistory20231Login.init({
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
    tableName: 'log_history_2023_1_login',
    schema: 'public',
    timestamps: false
  });
  }
}
