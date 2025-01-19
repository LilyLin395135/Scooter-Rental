import request from "supertest";
import app from "../../server.js";

describe("Create Rent Validation Tests", () => {
  it("should return 400 if userId is missing", async () => {
    const res = await request(app).post("/api/rents").send({
      scooterId: 1,
      startTime: "2025-01-17 00:00:00",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain("User ID is required.");
  });

  it("should return 400 if scooterId is missing", async () => {
    const res = await request(app).post("/api/rents").send({
      userId: 1,
      startTime: "2025-01-17 00:00:00",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain("Scooter ID is required.");
  });

  it("should return 400 if startTime is missing", async () => {
    const res = await request(app).post("/api/rents").send({
      userId: 1,
      scooterId: 1,
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain("Start time is required.");
  });

  it("should return 201 if all fields are valid", async () => {
    const res = await request(app).post("/api/rents").send({
      userId: 1,
      scooterId: 1,
      startTime: "2025-01-17 00:00:00",
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Rent created successfully.");
  });
});

describe("Return Rent Validation Tests", () => {
  it("should return 400 if end_time is missing", async () => {
    const res = await request(app).patch("/api/rents/1/return").send({});

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain("End time is required.");
  });

  it("should return 400 if end_time is invalid", async () => {
    const res = await request(app).patch("/api/rents/1/return").send({ endTime: "invalid-date" });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain("End time must be a valid datetime.");
  });

  it("should return 200 if all fields are valid", async () => {
    const res = await request(app).patch("/api/rents/1/return").send({ endTime: "2025-01-18 00:00:00" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Rent ended successfully.");
  });
});