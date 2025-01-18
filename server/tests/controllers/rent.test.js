import { createRent } from "../../controllers/rent.js";
import * as rentModel from "../../models/rent.js";

jest.mock("../../models/rent.js");

describe("Create Rent Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: { userId: 1, scooterId: 1, startTime: "2025-01-17 00:00:00" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if the user already has an active rent", async () => {
    rentModel.findActiveRentByUser.mockResolvedValue({ id: 1 });

    await createRent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "User already has an active rent.",
    });
  });

  it("should return 400 if the scooter is already rented", async () => {
    rentModel.findActiveRentByUser.mockResolvedValue(null);
    rentModel.findActiveRentByScooter.mockResolvedValue({ id: 1 });

    await createRent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Scooter is already rented by another user.",
    });
  });

  it("should create a new rent and return 201", async () => {
    rentModel.findActiveRentByUser.mockResolvedValue(null);
    rentModel.findActiveRentByScooter.mockResolvedValue(null);
    rentModel.insertRent.mockResolvedValue({
      id: 1,
      userId: 1,
      scooterId: 1,
      startTime: "2025-01-17 00:00:00",
      endTime: null,
    });

    await createRent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Rent created successfully.",
      rent: {
        id: 1,
        userId: 1,
        scooterId: 1,
        startTime: "2025-01-17 00:00:00",
        endTime: null,
      },
    });
  });

  it("should handle errors and call next with the error", async () => {
    const error = new Error("Test Error");
    rentModel.findActiveRentByUser.mockRejectedValue(error);

    await createRent(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
