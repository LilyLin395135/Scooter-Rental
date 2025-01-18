import express from "express";
import { createUser, getUsers } from "../controllers/user.js";
import { validateResult } from "../utils/validationHandler.js";
import { createUserValidator } from "../validators/user.js";

const router = express.Router();

router.post("/", createUserValidator, validateResult, createUser);

export default router;