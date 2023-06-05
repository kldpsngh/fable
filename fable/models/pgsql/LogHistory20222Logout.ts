import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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

export class LogHistory20222Logout extends Model<LogHistory20222LogoutAttributes, LogHistory20222LogoutCreationAttributes> implements LogHistory20222LogoutAttributes {
  id!: string;
  log_id?: number;
  created_date!: string;
  unix_ts?: number;
  user_id?: number;
  event_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory20222Logout {
    return LogHistory20222Logout.init({
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
    tableName: 'log_history_2022_2_logout',
    schema: 'public',
    timestamps: false
  });
  }
}
