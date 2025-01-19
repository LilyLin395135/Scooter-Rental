import pool from "./databasePool.js";

export const insertScooter = async (model, licensePlate) => {
  const sql = "INSERT INTO Scooter (model, license_plate) VALUES (?, ?)";
  const [result] = await pool.query(sql, [model, licensePlate]);
  return {
    id: result.insertId,
    model,
    license_plate: licensePlate
  };
};

export const findScooterByLicensePlate = async (licensePlate) => {
  const sql = "SELECT * FROM Scooter WHERE license_plate = ?";
  const [rows] = await pool.query(sql, [licensePlate]);
  return rows[0] || null;
};
