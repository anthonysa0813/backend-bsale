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

const addScore = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await User.findById(idUser);
    if (user) {
      user.score = user.score + 1;
      user.save();
    }
    return res.status(200).json({
      message: "Score added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  validateAnswer,
  addScore,
};
