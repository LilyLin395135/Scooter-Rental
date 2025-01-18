import request from "supertest";
import app from "../../server.js";

describe("Create User validation tests", () => {
  it("should return 400 if name is missing", async () => {
    const res = await request(app).post("/api/users").send({
      cellphone: "0912345678",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain("Name is required.");
  });

  it("should return 400 if cellphone is missing", async () => {
    const res = await request(app).post("/api/users").send({
      name: "John Doe",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain("Cellphone is required.");
  });

  it("should return 400 if cellphone format is invalid", async () => {
    const res = await request(app).post("/api/users").send({
      name: "John Doe",
      cellphone: "invalid",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain("Cellphone format is invalid.");
  });

  it("should return 201 if all fields are valid", async () => {
    const res = await request(app).post("/api/users").send({
      name: "John Doe",
      cellphone: "0912345678",
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User created successfully.");
  });
});