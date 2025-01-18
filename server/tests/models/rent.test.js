import { insertRent, findActiveRentByUser, findActiveRentByScooter } from "../../models/rent.js";
import pool from "../../models/databasePool.js";

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
      userId: 1,
      scooterId: 1,
      startTime: "2025-01-17 00:00:00",
      endTime: null,
    });
  });

  it("should return an active rent if the user has one", async () => {
    const mockRent = { id: 1, userId: 1, scooterId: 1, startTime: "2025-01-17 00:00:00", endTime: null };
    pool.query.mockResolvedValue([[mockRent]]);

    const rent = await findActiveRentByUser(1);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM Rent WHERE user_id = ? AND end_time IS NULL", [1]);
    expect(rent).toEqual(mockRent);
  });

  it("should return an active rent if the scooter is rented", async () => {
    const mockRent = { id: 1, userId: 1, scooterId: 1, startTime: "2025-01-17 00:00:00", endTime: null };
    pool.query.mockResolvedValue([[mockRent]]);

    const rent = await findActiveRentByScooter(1);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM Rent WHERE scooter_id = ? AND end_time IS NULL", [1]);
    expect(rent).toEqual(mockRent);
  });
});
