import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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

export class LogHistory20222Default extends Model<LogHistory20222DefaultAttributes, LogHistory20222DefaultCreationAttributes> implements LogHistory20222DefaultAttributes {
  id!: string;
  log_id?: number;
  created_date!: string;
  unix_ts?: number;
  user_id?: number;
  event_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory20222Default {
    return LogHistory20222Default.init({
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
    tableName: 'log_history_2022_2_default',
    schema: 'public',
    timestamps: false
  });
  }
}
