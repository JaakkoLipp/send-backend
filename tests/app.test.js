const request = require("supertest");
const app = require("../src/app");
const { generateCustomId } = require("../src/utils/idGen");

// Service is up
describe("App endpoints", () => {
  it("GET root with status 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});

// Util functions correctly
describe("ID generation", () => {
  it("generates a random ID", () => {
    const id = generateCustomId();
    expect(id.length).toBeGreaterThan(6);
  });
});
