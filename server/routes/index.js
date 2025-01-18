import express from "express";
import userRouter from "./user.js";
import scooterRouter from "./scooter.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/scooters", scooterRouter);

export default router;