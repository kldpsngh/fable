import type { Sequelize } from "sequelize";
import { SequelizeMetum as _SequelizeMetum } from "./SequelizeMetum";
import type { SequelizeMetumAttributes, SequelizeMetumCreationAttributes } from "./SequelizeMetum";
import { LogHistory as _LogHistory } from "./LogHistory";
import type { LogHistoryAttributes, LogHistoryCreationAttributes } from "./LogHistory";
import { LogHistory20222 as _LogHistory20222 } from "./LogHistory20222";
import type { LogHistory20222Attributes, LogHistory20222CreationAttributes } from "./LogHistory20222";
import { LogHistory20222Default as _LogHistory20222Default } from "./LogHistory20222Default";
import type { LogHistory20222DefaultAttributes, LogHistory20222DefaultCreationAttributes } from "./LogHistory20222Default";
import { LogHistory20222Login as _LogHistory20222Login } from "./LogHistory20222Login";
import type { LogHistory20222LoginAttributes, LogHistory20222LoginCreationAttributes } from "./LogHistory20222Login";
import { LogHistory20222Logout as _LogHistory20222Logout } from "./LogHistory20222Logout";
import type { LogHistory20222LogoutAttributes, LogHistory20222LogoutCreationAttributes } from "./LogHistory20222Logout";
import { LogHistory20231 as _LogHistory20231 } from "./LogHistory20231";
import type { LogHistory20231Attributes, LogHistory20231CreationAttributes } from "./LogHistory20231";
import { LogHistory20231Default as _LogHistory20231Default } from "./LogHistory20231Default";
import type { LogHistory20231DefaultAttributes, LogHistory20231DefaultCreationAttributes } from "./LogHistory20231Default";
import { LogHistory20231Login as _LogHistory20231Login } from "./LogHistory20231Login";
import type { LogHistory20231LoginAttributes, LogHistory20231LoginCreationAttributes } from "./LogHistory20231Login";
import { LogHistory20231Logout as _LogHistory20231Logout } from "./LogHistory20231Logout";
import type { LogHistory20231LogoutAttributes, LogHistory20231LogoutCreationAttributes } from "./LogHistory20231Logout";

export {
  _SequelizeMetum as SequelizeMetum,
  _LogHistory as LogHistory,
  _LogHistory20222 as LogHistory20222,
  _LogHistory20222Default as LogHistory20222Default,
  _LogHistory20222Login as LogHistory20222Login,
  _LogHistory20222Logout as LogHistory20222Logout,
  _LogHistory20231 as LogHistory20231,
  _LogHistory20231Default as LogHistory20231Default,
  _LogHistory20231Login as LogHistory20231Login,
  _LogHistory20231Logout as LogHistory20231Logout,
};

export type {
  SequelizeMetumAttributes,
  SequelizeMetumCreationAttributes,
  LogHistoryAttributes,
  LogHistoryCreationAttributes,
  LogHistory20222Attributes,
  LogHistory20222CreationAttributes,
  LogHistory20222DefaultAttributes,
  LogHistory20222DefaultCreationAttributes,
  LogHistory20222LoginAttributes,
  LogHistory20222LoginCreationAttributes,
  LogHistory20222LogoutAttributes,
  LogHistory20222LogoutCreationAttributes,
  LogHistory20231Attributes,
  LogHistory20231CreationAttributes,
  LogHistory20231DefaultAttributes,
  LogHistory20231DefaultCreationAttributes,
  LogHistory20231LoginAttributes,
  LogHistory20231LoginCreationAttributes,
  LogHistory20231LogoutAttributes,
  LogHistory20231LogoutCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const SequelizeMetum = _SequelizeMetum.initModel(sequelize);
  const LogHistory = _LogHistory.initModel(sequelize);
  const LogHistory20222 = _LogHistory20222.initModel(sequelize);
  const LogHistory20222Default = _LogHistory20222Default.initModel(sequelize);
  const LogHistory20222Login = _LogHistory20222Login.initModel(sequelize);
  const LogHistory20222Logout = _LogHistory20222Logout.initModel(sequelize);
  const LogHistory20231 = _LogHistory20231.initModel(sequelize);
  const LogHistory20231Default = _LogHistory20231Default.initModel(sequelize);
  const LogHistory20231Login = _LogHistory20231Login.initModel(sequelize);
  const LogHistory20231Logout = _LogHistory20231Logout.initModel(sequelize);


  return {
    SequelizeMetum: SequelizeMetum,
    LogHistory: LogHistory,
    LogHistory20222: LogHistory20222,
    LogHistory20222Default: LogHistory20222Default,
    LogHistory20222Login: LogHistory20222Login,
    LogHistory20222Logout: LogHistory20222Logout,
    LogHistory20231: LogHistory20231,
    LogHistory20231Default: LogHistory20231Default,
    LogHistory20231Login: LogHistory20231Login,
    LogHistory20231Logout: LogHistory20231Logout,
  };
}
