const path = require("path");
const fs = require("fs");
const File = require("../models/File");

// Upload a file
const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const newFile = new File({
    filename: req.file.filename,
    originalname: req.file.originalname,
  });
  // TODO: files should expire after TTL
  await newFile.save();

  res
    .status(201)
    .json({ message: "File uploaded successfully", file: newFile });
};

// Download a file
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
