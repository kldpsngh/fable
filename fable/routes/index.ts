import { Router } from "express";
const router = Router();
import { processLog } from "../controllers";

router.get("/server-alive", (req, res) => {
    res.status(200).send("It's alive");
});

router.post("/log", processLog);
export default router;
