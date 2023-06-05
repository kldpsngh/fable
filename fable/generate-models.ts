import SequelizeAuto from "sequelize-auto";
import { config } from "dotenv";
import { join } from "path";
const isWindows = process.platform == "win32";
const envBasePath = module.path.split(`${isWindows ? "\\" : "/"}node_modules`)[0];
const envPath = join(envBasePath, ".env");
config({ path: envPath });

const auto = new SequelizeAuto(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASS as string, {
    host: process.env.DB_HOST as string,
    dialect: "postgres",
    directory: "./models/pgsql",
    port: Number((process.env.DB_PORT as string) || "5432"),
    caseModel: "p", // convert snake_case column names to camelCase field names: user_id -> userId
    caseFile: "p", // file names created for each model use camelCase.js not snake_case.js
    singularize: true, // convert plural table names to singular model names
    noAlias: true,
    additional: {
        // ...options added to each model
        //not added timestamps ...
        // not added soft delete options ...
    },
    lang: "ts",
    useDefine: false,
    noIndexes: true
});

auto.run()
    .then(() => console.info("DB Models Generated"))
    .catch(console.error);
