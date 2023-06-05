import { LogRequest } from "../models/logRequest";
import { LogHistoryDatabase } from "../databases/logHistory";
import { RedisDatabase } from "../databases/redis";
import { EnvironmentVariables } from "../config/envVariable";
export declare class LogService {
    private readonly logHistoryDatabase;
    private readonly redisDatabase;
    private readonly envVariables;
    constructor(logHistoryDatabase: LogHistoryDatabase, redisDatabase: RedisDatabase, envVariables: EnvironmentVariables);
    saveLog(logData: LogRequest): Promise<void>;
    logConsumer(): Promise<void>;
    processInBatch(): Promise<void>;
}
//# sourceMappingURL=logService.d.ts.map