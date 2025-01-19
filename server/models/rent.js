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
    user_id: userId,
    scooter_id: scooterId,
    start_time: startTime,
    end_time: null,
  };
};

// Find rent by ID
export const findRentById = async (id) => {
  const sql = "SELECT * FROM Rent WHERE id = ?";
  const [rows] = await pool.query(sql, [id]);
  return rows[0] || null;
};

// Update rent
export const endRent = async (id, endTime) => {
  const updateSql = "UPDATE Rent SET end_time = ? WHERE id = ?";
  await pool.query(updateSql, [endTime, id]);

  const selectSql = "SELECT * FROM Rent WHERE id = ?";
  const [rows] = await pool.query(selectSql, [id]);
  return rows[0] || null;
};
