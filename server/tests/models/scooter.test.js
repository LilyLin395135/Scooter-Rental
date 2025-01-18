import { findScooterByLicensePlate, insertScooter } from "../../models/scooter.js";
import pool from "../../models/databasePool.js";

jest.mock("../../models/databasePool.js");

describe("Scooter Model", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a scooter if found by licensePlate", async () => {
    const mockScooter = { id: 1, model: "Yamaha", licensePlate: "123-ABC" };
    pool.query.mockResolvedValue([[mockScooter]]);

    const scooter = await findScooterByLicensePlate("123-ABC");
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM Scooter WHERE license_plate = ?", ["123-ABC"]);
    expect(scooter).toEqual(mockScooter);
  });

  it("should create a new scooter", async () => {
    const mockResult = { insertId: 1 };
    pool.query.mockResolvedValue([mockResult]);

    const scooter = await insertScooter("Yamaha", "123-ABC");
    expect(pool.query).toHaveBeenCalledWith("INSERT INTO Scooter (model, license_plate) VALUES (?, ?)", ["Yamaha", "123-ABC"]);
    expect(scooter).toEqual({ id: 1, model: "Yamaha", licensePlate: "123-ABC" });
  });
});