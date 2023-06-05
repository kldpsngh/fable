import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface LogHistory20231LogoutAttributes {
  id: string;
  log_id?: number;
  created_date: string;
  unix_ts?: number;
  user_id?: number;
  event_name: string;
}

export type LogHistory20231LogoutPk = "id" | "created_date" | "event_name";
export type LogHistory20231LogoutId = LogHistory20231Logout[LogHistory20231LogoutPk];
export type LogHistory20231LogoutOptionalAttributes = "log_id" | "created_date" | "unix_ts" | "user_id";
export type LogHistory20231LogoutCreationAttributes = Optional<LogHistory20231LogoutAttributes, LogHistory20231LogoutOptionalAttributes>;

export class LogHistory20231Logout extends Model<LogHistory20231LogoutAttributes, LogHistory20231LogoutCreationAttributes> implements LogHistory20231LogoutAttributes {
  id!: string;
  log_id?: number;
  created_date!: string;
  unix_ts?: number;
  user_id?: number;
  event_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof LogHistory20231Logout {
    return LogHistory20231Logout.init({
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
    tableName: 'log_history_2023_1_logout',
    schema: 'public',
    timestamps: false
  });
  }
}
