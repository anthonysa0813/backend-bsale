const { request, response } = require("express");
const AnswerModel = require("../../models/answer");
const User = require("../../models/auth");

const validateAnswer = async (req = request, res = response) => {
  try {
    const { idQuestion, idUser } = req.params;
    const { body } = req;
    const answer = await AnswerModel.findOne({ question: idQuestion });
    const user = await User.findById(idUser);
    console.log({ idQuestion: idQuestion, idUser });
    console.log(answer);
    if (answer.value === body.response) {
      user.score = user.score + 1;
      user.save();
    }

    return res.json({
      message: "validate answer",
      answer,
      body,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  validateAnswer,
};
