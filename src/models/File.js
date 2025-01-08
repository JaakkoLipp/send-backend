const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  path: { type: String, unique: true, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

fileSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("File", fileSchema);
