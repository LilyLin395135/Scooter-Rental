import request from "supertest";
import app from "../../server.js";

describe("Create Scooter validation tests", () => {
  it("should return 400 if model is missing", async () => {
    const res = await request(app).post("/api/scooters").send({
      licensePlate: "ABC123",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain("Model is required.");
  });

  it("should return 400 if licensePlate is missing", async () => {
    const res = await request(app).post("/api/scooters").send({
      model: "Yamaha",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain("License plate is required.");
  });

  it("should return 400 if licensePlate is over 20 characters", async () => {
    const res = await request(app).post("/api/scooters").send({
      model: "Yamaha",
      licensePlate: "A".repeat(21),
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain("License plate is too long.");
  });

  it("should return 400 if model is over 255 characters", async () => {
    const res = await request(app).post("/api/scooters").send({
      model: "A".repeat(256),
      licensePlate: "ABC123",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContain("Model is too long.");
  });

  it("should return 201 if all fields are valid", async () => {
    const res = await request(app).post("/api/scooters").send({
      model: "Yamaha",
      licensePlate: "ABC123",
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Scooter created successfully.");
  });
});