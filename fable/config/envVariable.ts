import { config } from "dotenv";
import { Service } from "typedi";

@Service()
export class EnvironmentVariables {
    NODE_ENV: "development" | "staging" | "staging_prod" | "main";
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: number;
    TIMEZONE: string;
    PORT: number;
    REDIS_HOST: string;
    REDIS_PORT: number;
    CONSUMER_TIME_INTERVAL: number;
    FILE_READ_PER_INTERVAL: number;
    constructor() {
        config();
        this.NODE_ENV = process.env.NODE_ENV || ("development" as any);
        this.DB_USER = process.env.DB_USER as string;
        this.DB_PASS = process.env.DB_PASS as string;
        this.DB_NAME = process.env.DB_NAME as string;
        this.DB_HOST = process.env.DB_HOST as string;
        this.DB_PORT = Number(process.env.DB_PORT || "5432");
        this.TIMEZONE = (process.env.TIMEZONE as string) || "Asia/Kolkata";
        this.PORT = Number(process.env.PORT || "8000");
        this.REDIS_HOST = process.env.REDIS_HOST || "localhost";
        this.REDIS_PORT = Number(process.env.REDIS_PORT || "63790");
        this.CONSUMER_TIME_INTERVAL = Number(process.env.CONSUMER_TIME_INTERVAL || "3000"); //in ms. 5 mins.
        this.FILE_READ_PER_INTERVAL = Number(process.env.FILE_READ_PER_INTERVAL || "20"); //this can be increased...
    }
}
