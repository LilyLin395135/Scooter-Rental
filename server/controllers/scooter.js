import { findScooterByLicensePlate, insertScooter } from "../models/scooter.js";

export const createScooter = async (req, res, next) => {
  try {
    const { model, licensePlate } = req.body;

    const existingScooter = await findScooterByLicensePlate(licensePlate);
    if (existingScooter) {
      return res.status(400).json({ message: "Scooter with this license plate already exists." });
    }

    const newScooter = await insertScooter(model, licensePlate);
    res.status(201).json({
      message: "Scooter created successfully.",
      scooter: {
        id: newScooter.id,
        model: newScooter.model,
        licensePlate: newScooter.license_plate
      }
    });
  } catch (error) {
    next(error);
  }
};