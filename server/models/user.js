import pool from './databasePool.js';

export const insertUser = async (name, cellphone) => {
  const sql = "INSERT INTO User (name, cellphone) VALUES (?, ?)";
  const [result] = await pool.query(sql, [name, cellphone]);
  return { id: result.insertId, name, cellphone };
};

export const findUserByCellphone = async (cellphone) => {
  const sql = "SELECT * FROM User WHERE cellphone = ?";
  const [rows] = await pool.query(sql, [cellphone]);
  return rows[0] || null;
};