import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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

export class LogHistory20222 extends Model<LogHistory20222Attributes, LogHistory20222CreationAttributes> implements LogHistory20222Attributes {
  id!: string;
  log_id?: number;
  created_date!: string;
  unix_ts?: number;
  user_id?: number;
  event_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory20222 {
    return LogHistory20222.init({
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
    tableName: 'log_history_2022_2',
    schema: 'public',
    timestamps: false
  });
  }
}
