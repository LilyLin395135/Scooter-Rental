import express from "express";
import userRouter from "./user.js";
import scooterRouter from "./scooter.js";
import rentRouter from "./rent.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/scooters", scooterRouter);
router.use("/rents", rentRouter);

export default router;