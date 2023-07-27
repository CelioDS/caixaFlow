import express from "express";

import { getDB, setDB } from "../controllers/controllers.js";

const router = express.Router();

router.get("/", getDB);

router.post("/", setDB);

export default router;
