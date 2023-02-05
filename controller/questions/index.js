const { request, response } = require("express");

const createQuestion = (req = request, res = response) => {
  const body = req.body;
  const image = req.files;

  console.log({ body });

  return res.json({
    message: "hagad :D",
  });
};

module.exports = {
  createQuestion,
};
