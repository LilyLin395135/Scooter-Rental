import { body } from "express-validator";

export const createScooterValidator = [
  body("model")
    .notEmpty().withMessage("Model is required.")
    .isLength({ max: 255 }).withMessage("Model is too long."),
  body("licensePlate")
    .notEmpty().withMessage("License plate is required.")
    .isLength({ max: 20 }).withMessage("License plate is too long."),
];