import express from "express";
import { createRent, returnRent } from "../controllers/rent.js";
import { validateResult } from "../utils/validationHandler.js";
import { createRentValidator, returnRentValidator } from "../validators/rent.js";

const router = express.Router();

router.post("/", createRentValidator, validateResult, createRent);
router.patch("/:id/return", returnRentValidator, validateResult, returnRent);

export default router;