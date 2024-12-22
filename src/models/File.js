const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: String,
  path: String,
  uploadedAt: { type: Date, default: Date.now },
});
// TODO: add TTL
module.exports = mongoose.model("File", fileSchema);
