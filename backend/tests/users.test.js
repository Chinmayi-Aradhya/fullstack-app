const request = require("supertest");
const app = require("../app");

describe("Users API", () => {

  it("GET /api/users should return users", async () => {
    const res = await request(app).get("/api/users");

    expect(res.statusCode).toBe(200);
  });

  it("POST /api/users should create a user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        name: "Test User",
        email: "testuser@test.com"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Test User");
  });

});