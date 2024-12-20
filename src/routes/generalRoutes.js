const express = require("express");

// root route handler
router.get("/", (req, res) => res.json({ message: "Hello World" }));

module.exports = router;
