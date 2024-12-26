const path = require("path");
const fs = require("fs");
const File = require("../models/File");
const { generateCustomId } = require("../utils/idGen");

// Upload a file
const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  //TODO: file encryption client side?
  try {
    const generatedFileId = generateCustomId();

    const file = new File({
      id: generatedFileId,
      name: req.file.originalname,
      path: req.file.path,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // Set TTL to 5 minutes
    });

    await file.save();
    console.log("File saved to database:", file);

    res
      .status(201)
      .json({ message: "File uploaded successfully!", id: generatedFileId });
  } catch (err) {
    // Cleanup uploaded file on error
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error("Error cleaning up file:", unlinkErr);
      });
    }
    console.log(err);
    res.status(500).json({ error: "Error uploading file" });
  }
};

// Download a file
const getFile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Looking for file with ID:", id);

    // Find the file in the database
    const file = await File.findOne({ id: id });
    if (!file) {
      console.error("File not found in database for ID:", id);
      return res.status(404).json({ error: "File not found" });
    }

    console.log("File found in database:", file);

    const resolvedPath = path.resolve(file.path);
    console.log("Resolved file path:", resolvedPath);

    // Extract the original filename by removing the timestamp
    const originalName = file.name.includes("-")
      ? file.name.split("-").slice(1).join("-") // Remove the first part (timestamp)
      : file.name;

    console.log("Original filename:", originalName);

    // Send the file for download with the cleaned filename
    res.download(resolvedPath, originalName, (err) => {
      if (err) {
        console.error("Error during file download:", err);
        return res.status(500).json({ error: "Error downloading file" });
      } else {
        // After successful download, delete the file from uploads folder and database
        fs.unlink(resolvedPath, async (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting file from server:", unlinkErr);
          } else {
            console.log("File deleted from server:", resolvedPath);

            // Remove file metadata from the database
            await File.deleteOne({ id: id });
            console.log("File metadata deleted from database.");
          }
        });
        console.log("File download completed successfully.");
      }
    });
  } catch (err) {
    console.error("Error in getFile:", err);
    res.status(500).json({ error: "Error getting file" });
  }
};

module.exports = { uploadFile, getFile };
