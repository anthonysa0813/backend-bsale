const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = async (req = request, res = response, next) => {
  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Missing or invalid authorization header",
    });
  }

  const token = authHeader.substring(7);

  console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid token",
      error: err.message,
    });
  }
};

module.exports = validateJWT;
