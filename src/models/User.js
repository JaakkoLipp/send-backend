const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  // TODO: password hashing implemented later
  password: { type: String, required: true },
});
