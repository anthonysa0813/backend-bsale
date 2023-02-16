const { request, response } = require("express");
const AnswerModel = require("../../models/answer");
const User = require("../../models/auth");

const validateAnswer = async (req = request, res = response) => {
  const { idQuestion, idUser } = req.params;
  const { body } = req;
  const answer = await AnswerModel.findOne({ question: idQuestion });
  const user = await User.findById(idUser);

  if (answer.value === body.response) {
    user.score = user.score + 1;
    user.save();
  }

  res.json({
    message: "validate answer",
    answer,
    body,
  });
};

module.exports = {
  validateAnswer,
};
