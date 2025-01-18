import express from "express";
import { createRent } from "../controllers/rent.js";
import { validateResult } from "../utils/validationHandler.js";
import { createRentValidator } from "../validators/rent.js";

const router = express.Router();

router.post("/", createRentValidator, validateResult, createRent);

export default router;