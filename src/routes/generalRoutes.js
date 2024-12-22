const express = require("express");

const router = express.Router();

// root route handler
router.get("/", (req, res) => res.json({ message: "Service UP" }));

module.exports = router;
