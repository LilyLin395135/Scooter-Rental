import { validationResult } from "express-validator";
import { ValidationError } from "./errorHandler.js";

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    return next(new ValidationError(errorMessages.join(", ")));
  }
  next();
};
