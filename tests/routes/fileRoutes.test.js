const request = require("supertest");
const app = require("../../src/app");
const path = require("path");

// TODO: CRUD File operations tests
describe("File operations", () => {
  it("uploads a file successfully", async () => {
    const response = await request(app)
      .post("/api/files/upload")
      .attach("file", path.resolve(__dirname, "../fixtures/testFile.txt"));
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("File uploaded successfully!");
  });

  it("fails to upload a file when no file is provided", async () => {
    const response = await request(app).post("/api/files/upload");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("No file uploaded");
  });
});
