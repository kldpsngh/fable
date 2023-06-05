"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const controllers_1 = require("../controllers");
router.get("/server-alive", (req, res) => {
    res.status(200).send("It's alive");
});
router.post("/log", controllers_1.processLog);
exports.default = router;
//# sourceMappingURL=index.js.map