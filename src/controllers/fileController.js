const path = require("path");
const fs = require("fs");

// Upload a file
const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res
    .status(201)
    .json({ message: "File uploaded successfully", file: req.file });
};

// Retrieve a file
const getFile = (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "../../uploads", filename);

  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
};

module.exports = { uploadFile, getFile };
