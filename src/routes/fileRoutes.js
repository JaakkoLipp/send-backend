const express = require("express");
const multer = require("multer");
const { uploadFile, downloadFile } = require("../controllers/fileController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // TODO: Implement better file name generation logic
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/:filename", getFile);
router.get("/all", (req, res) => {
  res.send(message:"TBD");
});

router.delete("/delete/:filename", (req, res) => {
  res.send(message:"TBD");
});

module.exports = router;
