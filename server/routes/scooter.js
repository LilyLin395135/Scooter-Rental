import express from "express";
import { createScooter } from "../controllers/scooter.js";
import { validateResult } from "../utils/validationHandler.js";
import { createScooterValidator } from "../validators/scooter.js";

const router = express.Router();

router.post("/", createScooterValidator, validateResult, createScooter);

export default router;