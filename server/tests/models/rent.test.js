import pool from "../../models/databasePool.js";
import {
  insertRent,
  findActiveRentByUser,
  findActiveRentByScooter,
  endRent,
  findRentById
} from "../../models/rent.js";

jest.mock("../../models/databasePool.js");

describe("Rent Model", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new rent", async () => {
    const mockResult = { insertId: 1 };
    pool.query.mockResolvedValue([mockResult]);

    const rent = await insertRent(1, 1, "2025-01-17 00:00:00");
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO Rent (user_id, scooter_id, start_time) VALUES (?, ?, ?)",
      [1, 1, "2025-01-17 00:00:00"]
    );
    expect(rent).toEqual({
      id: 1,
      user_id: 1,
      scooter_id: 1,
      start_time: "2025-01-17 00:00:00",
      end_time: null
    });
  });

  it("should return an active rent if the user has one", async () => {
    const mockRent = {
      id: 1,
      user_id: 1,
      scooter_id: 1,
      start_time: "2025-01-17 00:00:00",
      end_time: null
    };
    pool.query.mockResolvedValue([[mockRent]]);

    const rent = await findActiveRentByUser(1);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM Rent WHERE user_id = ? AND end_time IS NULL", [1]);
    expect(rent).toEqual(mockRent);
  });

  it("should return an active rent if the scooter is rented", async () => {
    const mockRent = {
      id: 1,
      user_id: 1,
      scooter_id: 1,
      start_time: "2025-01-17 00:00:00",
      end_time: null
    };
    pool.query.mockResolvedValue([[mockRent]]);

    const rent = await findActiveRentByScooter(1);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM Rent WHERE scooter_id = ? AND end_time IS NULL", [1]);
    expect(rent).toEqual(mockRent);
  });
});

describe("Return Model", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a rent if found by ID", async () => {
    const mockRent = {
      id: 1,
      user_id: 1,
      scooter_id: 1,
      start_time: "2025-01-17 00:00:00",
      end_time: null
    };
    pool.query.mockResolvedValue([[mockRent]]);

    const rent = await findRentById(1);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM Rent WHERE id = ?", [1]);
    expect(rent).toEqual(mockRent);
  });

  it("should update the endTime of a rent", async () => {
    const mockUpdatedRent = {
      id: 1,
      user_id: 1,
      scooter_id: 1,
      start_time: "2025-01-17 00:00:00",
      end_time: "2025-01-18 00:00:00"
    };
    pool.query
      .mockResolvedValueOnce([{}])
      .mockResolvedValueOnce([[mockUpdatedRent]]);

    const rent = await endRent(1, "2025-01-18 00:00:00");
    expect(pool.query).toHaveBeenCalledWith("UPDATE Rent SET end_time = ? WHERE id = ?", ["2025-01-18 00:00:00", 1]);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM Rent WHERE id = ?", [1]);
    expect(rent).toEqual(mockUpdatedRent);
  });
});