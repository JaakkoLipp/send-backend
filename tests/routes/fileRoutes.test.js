const request = require("supertest");
const app = require("../../src/app"); // Import your Express app
const fs = require("fs");
const path = require("path");

// Create a test file to use for uploads
const testFilePath = path.join(__dirname, "testFile.txt");
fs.writeFileSync(testFilePath, "This is a test file.");

// Describe the test suite
describe("File Upload and Download API", () => {
  let fileUrl; // To store the file URL for the download test

  afterAll(() => {
    // Clean up the test file
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  test("Upload a file successfully", async () => {
    const response = await request(app)
      .post("/upload")
      .attach("file", testFilePath); // Simulate file upload

    expect(response.status).toBe(201); // HTTP 201 Created
    expect(response.body).toHaveProperty("fileUrl"); // Response contains a file URL
    fileUrl = response.body.fileUrl; // Save the file URL for the next test
  });

  test("Download the uploaded file successfully", async () => {
    // Extract file ID from the saved file URL
    const fileId = fileUrl.split("/").pop();

    const response = await request(app)
      .get(`/download/${fileId}`) // Use the fileId to test downloading
      .expect(200); // Expect HTTP 200 OK

    // Check response headers and content
    expect(response.headers["content-type"]).toContain(
      "application/octet-stream"
    );
    expect(response.text).toBe("This is a test file."); // Ensure the file content matches
  });
});
