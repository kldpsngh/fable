import { DatabaseModels } from "../config/database";
export declare class RedisDatabase {
    private readonly db;
    private redisConnection;
    constructor(db: DatabaseModels);
    readData(key: string): Promise<any>;
    writeData(key: string, value: any, expiresAt?: Date): Promise<"OK">;
    deleteKey(key: string): Promise<number>;
    ifKeyExists(key: string): Promise<unknown>;
}
//# sourceMappingURL=redis.d.ts.map