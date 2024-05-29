const request = require("supertest");
const app = require("../app"); // Ensure this path is correct
const sequelize = require("../src/utils/sequelize");

describe("GET /", () => {
  beforeAll(async () => {
    // Ensure the database is connected before running tests
    try {
      await sequelize.authenticate();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await sequelize.close();
  });

  it("should return 200 OK", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Hello from new application.");
  });
});
