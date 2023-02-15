const { request, response } = require("express");

const validateAnswer = (req = request, res = response) => {
  res.json({
    message: "validate answer",
  });
};

module.exports = {
  validateAnswer,
};
