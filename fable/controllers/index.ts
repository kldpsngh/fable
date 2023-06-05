import { Request, Response } from "express";
import { Container } from "typedi";
import { LogService } from "../services/logService";
import { LogRequest } from "../models/logRequest";

export async function processLog(req: Request, res: Response) {
    try {
        if (!req.body) return res.status(400).send("Bad Request"); // can use joi for checking valid request and it's paramters ...
        await Container.get(LogService).saveLog(req.body as LogRequest);
        res.status(201).send("Saved");
    } catch (ex) {
        console.error(ex);
        //logging to s3 or elk ...
        return res.sendStatus(500);
    }
}
