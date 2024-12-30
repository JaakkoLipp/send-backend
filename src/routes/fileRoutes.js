const express = require("express");
const multer = require("multer");
const {
  uploadFile,
  getFile,
  deleteFile,
} = require("../controllers/fileController");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Set file size limit
const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 5 MB
});

// Routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/download/:id", getFile);
router.delete("/delete/:id", deleteFile);

router.get("/all", (req, res) => {
  res.json({ message: "TBD" });
});

router.delete("/delete/:filename", (req, res) => {
  res.json({ message: "TBD" });
});

module.exports = router;
