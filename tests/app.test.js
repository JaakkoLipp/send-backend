const request = require("supertest");
const express = require("express");

const app = express();
app.get("/", (req, res) => res.json({ message: "Hello World" }));

test("GET /ping should return pong", async () => {
  const response = await request(app).get("/ping");
  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe("pong");
});
