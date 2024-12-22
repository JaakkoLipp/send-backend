const express = require("express");
const dotenv = require("dotenv");
const fileRoutes = require("./routes/fileRoutes");
const generalRoutes = require("./routes/generalRoutes");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// TODO: Start server move to server.js for automated testing
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
