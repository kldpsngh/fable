import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface LogHistory20231Attributes {
  id: string;
  log_id?: number;
  created_date: string;
  unix_ts?: number;
  user_id?: number;
  event_name: string;
}

export type LogHistory20231Pk = "id" | "created_date" | "event_name";
export type LogHistory20231Id = LogHistory20231[LogHistory20231Pk];
export type LogHistory20231OptionalAttributes = "log_id" | "created_date" | "unix_ts" | "user_id";
export type LogHistory20231CreationAttributes = Optional<LogHistory20231Attributes, LogHistory20231OptionalAttributes>;

export class LogHistory20231 extends Model<LogHistory20231Attributes, LogHistory20231CreationAttributes> implements LogHistory20231Attributes {
  id!: string;
  log_id?: number;
  created_date!: string;
  unix_ts?: number;
  user_id?: number;
  event_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory20231 {
    return LogHistory20231.init({
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
    tableName: 'log_history_2023_1',
    schema: 'public',
    timestamps: false
  });
  }
}
