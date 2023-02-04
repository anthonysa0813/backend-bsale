const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = async (req = request, res = response) => {
  const token = req.headers("Authorization");

  // verificación si están mandando el token
  if (!token) {
    return res.status(401).json({
      message: "El token no existe",
    });
  }

  // validación del token
  try {
    const tokenValid = jwt.verify(token, process.env.PUBLIC_KEY);
    console.log({ tokenValid });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "token NOT valid",
    });
  }
};
