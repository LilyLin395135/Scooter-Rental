import { findActiveRentByUser, findActiveRentByScooter, insertRent } from "../models/rent.js";

export const createRent = async (req, res, next) => {
  try {
    const { userId, scooterId, startTime } = req.body;

    // Check if user already has an active rent
    const userActiveRent = await findActiveRentByUser(userId);
    if (userActiveRent) {
      return res
        .status(400)
        .json({ message: "User already has an active rent." });
    }

    // Check if the scooter is already rented
    const scooterActiveRent = await findActiveRentByScooter(scooterId);
    if (scooterActiveRent) {
      return res
        .status(400)
        .json({ message: "Scooter is already rented by another user." });
    }

    // Create new rent record
    const newRent = await insertRent(userId, scooterId, startTime);

    res.status(201).json({
      message: "Rent created successfully.",
      rent: newRent,
    });
  } catch (error) {
    next(error);
  }
};
