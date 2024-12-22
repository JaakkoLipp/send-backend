const path = require("path");
const fs = require("fs");
const File = require("../models/File");
const { generateCustomId } = require("../utils/idGen");

// Upload a file
const uploadFile = async (req, res) => {
  try {
    const generatedFileId = generateCustomId();

    const file = new File({
      id: generatedFileId,
      name: req.file.originalname,
      path: req.file.path,
    });

    await file.save();
    res
      .status(201)
      .json({ message: "File uploaded successfully!", id: fileNanoId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error uploading file" });
  }
};

// Download a file
const getFile = (req, res) => {
  try {
    const { nanoid } = req.params;

    const file = File.findOne({ id: nanoid });
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    res.download(file.path, file.name);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error getting file" });
  }
};

module.exports = { uploadFile, getFile };
