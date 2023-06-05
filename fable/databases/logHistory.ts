import { Service } from "typedi";
import { DatabaseModels } from "../config/database";
import { LogHistoryCreationAttributes } from "../models/pgsql/LogHistory";
import { Transaction } from "sequelize";

@Service()
export class LogHistoryDatabase {
    private logHistoryModel;

    constructor(private readonly db: DatabaseModels) {
        this.logHistoryModel = this.db.dbModels.LogHistory;
    }

    save(logData: LogHistoryCreationAttributes) {
        return this.logHistoryModel.create(logData);
    }

    bulkSave(logData: LogHistoryCreationAttributes[], transaction: Transaction) {
        return this.logHistoryModel.bulkCreate(logData, {
            transaction
        });
    }

    getTransaction() {
        return this.db.sequelize.transaction();
    }
}
