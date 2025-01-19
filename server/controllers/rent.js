import {
  findActiveRentByUser,
  findActiveRentByScooter,
  insertRent,
  endRent,
  findRentById
} from "../models/rent.js";

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
      rent: {
        id: newRent.id,
        userId: newRent.user_id,
        scooterId: newRent.scooter_id,
        startTime: newRent.start_time,
        endTime: newRent.end_time,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const returnRent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { endTime } = req.body;

    const rent = await findRentById(id);

    if (!rent || rent.end_time) {
      return res.status(404).json({ message: "Rent not found or already ended." });
    }

    const updatedRent = await endRent(id, endTime);

    res.status(200).json({
      message: "Rent ended successfully.",
      rent: {
        id: updatedRent.id,
        userId: updatedRent.user_id,
        scooterId: updatedRent.scooter_id,
        startTime: updatedRent.start_time,
        endTime: updatedRent.end_time,
      }
    });
  } catch (error) {
    next(error);
  }
};