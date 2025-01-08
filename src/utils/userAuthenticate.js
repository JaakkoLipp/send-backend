const jwt = require("jsonwebtoken");

// Authentication middleware
module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    // Attach the user ID to the request object
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};
