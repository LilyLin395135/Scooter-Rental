import { createUser } from "../../controllers/userController.js";
import * as userModel from "../../models/user.js";

jest.mock("../../models/user.js", () => ({
  findUserByCellphone: jest.fn(),
  insertUser: jest.fn(),
}));

describe("Create User Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { name: "John Doe", cellphone: "0912345678" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if user already exists", async () => {
    userModel.findUserByCellphone.mockResolvedValue({ id: 1, name: "John Doe", cellphone: "0912345678" });

    await createUser(req, res, next);

    expect(userModel.findUserByCellphone).toHaveBeenCalledWith("0912345678");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "User with this cellphone already exists." });
  });

  it("should create a new user and return 201", async () => {
    userModel.findUserByCellphone.mockResolvedValue(null);
    userModel.insertUser.mockResolvedValue({ id: 1, name: "John Doe", cellphone: "0912345678" });

    await createUser(req, res, next);

    expect(userModel.findUserByCellphone).toHaveBeenCalledWith("0912345678");
    expect(userModel.insertUser).toHaveBeenCalledWith("John Doe", "0912345678");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created successfully.",
      user: { id: 1, name: "John Doe", cellphone: "0912345678" },
    });
  });

  it("should handle errors and call next with the error", async () => {
    const error = new Error("Test Error");
    userModel.findUserByCellphone.mockRejectedValue(error);

    await createUser(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
