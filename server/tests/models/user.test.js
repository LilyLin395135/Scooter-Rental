import { findUserByCellphone, insertUser } from "../../models/user.js";
import pool from "../../models/databasePool.js";

jest.mock("../../models/databasePool.js");

describe("User Model", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a user if found by cellphone", async () => {
    const mockUser = { id: 1, name: "John Doe", cellphone: "0912345678" };
    pool.query.mockResolvedValue([[mockUser]]);

    const user = await findUserByCellphone("0912345678");
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM User WHERE cellphone = ?", ["0912345678"]);
    expect(user).toEqual(mockUser);
  });

  it("should create a new user", async () => {
    const mockResult = { insertId: 1 };
    pool.query.mockResolvedValue([mockResult]);

    const user = await insertUser("John Doe", "0912345678");
    expect(pool.query).toHaveBeenCalledWith("INSERT INTO User (name, cellphone) VALUES (?, ?)", ["John Doe", "0912345678"]);
    expect(user).toEqual({ id: 1, name: "John Doe", cellphone: "0912345678" });
  });
});
