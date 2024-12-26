const express = require("express");
const dotenv = require("dotenv");
const fileRoutes = require("./routes/fileRoutes");
const generalRoutes = require("./routes/generalRoutes");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS for filenames
app.use(
  cors({
    exposedHeaders: ["Content-Disposition"],
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URI || "mongodb://localhost:27017/send")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());

// Routes
app.use("/api/files", fileRoutes);
app.use("/", generalRoutes);

// Multer filesize limiter error handler
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "File size exceeds the limit." });
  }
  next(err); // Pass any other errors to the default error handler
});

// TODO: Start server move to server.js for automated testing
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
