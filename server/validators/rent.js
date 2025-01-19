import { body } from "express-validator";

export const createRentValidator = [
  body("userId")
    .notEmpty().withMessage("User ID is required.")
    .isInt().withMessage("User ID must be an integer."),
  body("scooterId").
    notEmpty().withMessage("Scooter ID is required.")
    .isInt().withMessage("Scooter ID must be an integer."),
  body("startTime")
    .notEmpty().withMessage("Start time is required.")
    .isISO8601().withMessage("Start time must be a valid ISO8601 date string."),
];

export const returnRentValidator = [
  body("endTime")
    .notEmpty().withMessage("End time is required.")
    .isISO8601().withMessage("End time must be a valid datetime."),
];