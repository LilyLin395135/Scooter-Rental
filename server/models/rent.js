import pool from "./databasePool.js";

// Find active rent by user
export const findActiveRentByUser = async (userId) => {
  const sql = "SELECT * FROM Rent WHERE user_id = ? AND end_time IS NULL";
  const [rows] = await pool.query(sql, [userId]);
  return rows[0] || null;
};

// Find active rent by scooter
export const findActiveRentByScooter = async (scooterId) => {
  const sql = "SELECT * FROM Rent WHERE scooter_id = ? AND end_time IS NULL";
  const [rows] = await pool.query(sql, [scooterId]);
  return rows[0] || null;
};

// Insert new rent record
export const insertRent = async (userId, scooterId, startTime) => {
  const sql =
    "INSERT INTO Rent (user_id, scooter_id, start_time) VALUES (?, ?, ?)";
  const [result] = await pool.query(sql, [userId, scooterId, startTime]);
  return {
    id: result.insertId,
    userId,
    scooterId,
    startTime,
    endTime: null,
  };
};
