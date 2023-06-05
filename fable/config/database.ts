import { initModels } from "../models/pgsql/init-models";
import { Sequelize } from "sequelize";
import { Service } from "typedi";
import { EnvironmentVariables } from "./envVariable";
import { createClient } from "redis";

@Service()
export class DatabaseModels {
    dbModels;
    sequelize;
    redisConnection;
    constructor(private readonly ENV_VARIABLES: EnvironmentVariables) {
        this.sequelize = new Sequelize(this.ENV_VARIABLES.DB_NAME, this.ENV_VARIABLES.DB_USER, this.ENV_VARIABLES.DB_PASS, {
            host: this.ENV_VARIABLES.DB_HOST,
            port: this.ENV_VARIABLES.DB_PORT,
            dialect: "postgres",
            logging: false
        });
        this.dbModels = initModels(this.sequelize);
        this.redisConnection = createClient({
            url: `redis://${this.ENV_VARIABLES.REDIS_HOST}:${this.ENV_VARIABLES.REDIS_PORT}`
        })
            .on("connect", () => {
                console.log("Redis Connected");
            })
            .on("error", (err: any) => {
                console.error("Error connecting to redis : " + err);
            });
    }
}
