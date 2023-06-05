import "reflect-metadata";
import "source-map-support/register";
import express from "express";
import { Container } from "typedi";
import fs from "fs";
import path from "path";
const app = express();
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true }));
import { EnvironmentVariables } from "./config/envVariable";
import { LogService } from "./services/logService";
import routes from "./routes";
const PORT = Container.get(EnvironmentVariables).PORT;
app.use("/fable", routes);
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
//Make logs directory
let logDirectory = path.join(__dirname, "/tempLogs");
if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);
//start consumer as well .
Container.get(LogService).logConsumer();
export default app;
