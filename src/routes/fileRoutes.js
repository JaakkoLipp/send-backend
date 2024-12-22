const express = require("express");
const multer = require("multer");
const { uploadFile, getFile } = require("../controllers/fileController");

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
const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/:fileid", getFile);

router.get("/all", (req, res) => {
  res.json({ message: "TBD" });
});

router.delete("/delete/:filename", (req, res) => {
  res.json({ message: "TBD" });
});

module.exports = router;
