const jwt = require("jsonwebtoken");

// used to authenticate and verify users using JWT tokens
module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);

  // exctract token from header
  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  } else {
    token = null;
  }

  // invalid token
  if (token == null) return res.sendStatus(401);
  console.log("Token found");

  // decode token
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
