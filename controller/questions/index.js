const { request, response } = require("express");
const Question = require("../../models/question");
const Alternative = require("../../models/alternatives");

const getAllQuestion = async (req = request, res = response) => {
  try {
    const questions = await Question.find().populate("alternatives");
    res.json(questions);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Hubo un error",
    });
  }
};

const createQuestion = async (req = request, res = response) => {
  const {
    description,
    image,
    answer,
    option1,
    option2,
    option3,
    option4,
    idPhase,
  } = req.body;

  if (
    [
      description,
      image,
      answer,
      option1,
      option2,
      option3,
      option4,
      idPhase,
    ].includes("")
  ) {
    return res.status(404).json({
      message: "faltan campos",
    });
  }

  const alternative1 = new Alternative({
    option: option1,
    questionRef: idPhase,
  });
  const alternative2 = new Alternative({
    option: option2,
    questionRef: idPhase,
  });
  const alternative3 = new Alternative({
    option: option3,
    questionRef: idPhase,
  });
  const alternative4 = await new Alternative({
    option: option4,
    questionRef: idPhase,
  });
  alternative1.save();
  alternative2.save();
  alternative3.save();
  alternative4.save();

  const questionObejct = await new Question({
    description,
    image,
    answer,
    phase1: idPhase,
    alternatives: [alternative1, alternative2, alternative3, alternative4],
  });

  questionObejct.save();

  return res.json(questionObejct);
};

module.exports = {
  createQuestion,
  getAllQuestion,
};
