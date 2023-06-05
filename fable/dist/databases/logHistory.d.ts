import { DatabaseModels } from "../config/database";
import { LogHistoryCreationAttributes } from "../models/pgsql/LogHistory";
import { Transaction } from "sequelize";
export declare class LogHistoryDatabase {
    private readonly db;
    private logHistoryModel;
    constructor(db: DatabaseModels);
    save(logData: LogHistoryCreationAttributes): any;
    bulkSave(logData: LogHistoryCreationAttributes[], transaction: Transaction): any;
    getTransaction(): any;
}
//# sourceMappingURL=logHistory.d.ts.map