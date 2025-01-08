const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// route handler
const register = async (req, res) => {
  // register a new user
  try {
    // user data from req
    const { email, password } = req.body;

    // invalid req
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Encrypt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    const newUser = await User.create({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
    // if error occurs
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

// route handler
const login = async (req, res) => {
  // login a user
  try {
    const { email, password } = req.body;

    // invalid req
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // validate passwd
    const isPasswdValid = await User.comparePassword(email, password);
    if (!isPasswdValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // jwt token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });

    // err handling
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

// route handler & also needs a reset-password route with reset token
const forgotPasswd = async (req, res) =>
  res.json({ message: "Not implemented" });

// route handler
const userFiles = async (req, res) => {
  res.json({ message: "Not implemented" });
};

module.exports = { login, register, forgotPasswd, userFiles };
