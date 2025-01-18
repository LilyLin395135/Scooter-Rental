import { createScooter } from "../../controllers/scooter.js";
import * as scooterModel from "../../models/scooter.js";

jest.mock("../../models/scooter.js", () => ({
  findScooterByLicensePlate: jest.fn(),
  insertScooter: jest.fn(),
}));

describe("Create Scooter Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { model: "Yamaha", licensePlate: "123-ABC" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if licensePlate already exists", async () => {
    scooterModel.findScooterByLicensePlate.mockResolvedValue({ id: 1, model: "Yamaha", licensePlate: "123-ABC" });

    await createScooter(req, res, next);

    expect(scooterModel.findScooterByLicensePlate).toHaveBeenCalledWith("123-ABC");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Scooter with this license plate already exists." });
  });

  it("should create a new scooter and return 201", async () => {
    scooterModel.findScooterByLicensePlate.mockResolvedValue(null);
    scooterModel.insertScooter.mockResolvedValue({ id: 1, model: "Yamaha", licensePlate: "123-ABC" });

    await createScooter(req, res, next);

    expect(scooterModel.findScooterByLicensePlate).toHaveBeenCalledWith("123-ABC");
    expect(scooterModel.insertScooter).toHaveBeenCalledWith("Yamaha", "123-ABC");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Scooter created successfully.",
      scooter: { id: 1, model: "Yamaha", licensePlate: "123-ABC" },
    });
  });

  it("should handle errors and call next with the error", async () => {
    const error = new Error("Test Error");
    scooterModel.findScooterByLicensePlate.mockRejectedValue(error);

    await createScooter(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});