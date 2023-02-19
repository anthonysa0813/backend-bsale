const { request, response } = require("express");
const Question = require("../../models/question");
const Alternative = require("../../models/alternatives");
const jest = require("jest");
const AnswerModel = require("../../models/answer");

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

  try {
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

    // creacion de la tabla answer para este question

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
      phase1: idPhase,
      alternatives: [alternative1, alternative2, alternative3, alternative4],
    });

    questionObejct.save();

    const answerStructure = await new AnswerModel({
      value: answer,
      question: questionObejct.id,
    });
    answerStructure.save();
    return res.json(questionObejct);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

let testOne;
let testSecond;
let testThird;

const createStageWithCode = async (req = request, res = response) => {
  try {
    const { description, codeFunc, phase1, type, test1, test2, test3 } =
      req.body;
    testOne = test1;
    testSecond = test2;
    testThird = test3;
    const quest = new Question({
      description,
      codeFunc,
      phase1,
      type,
      test1,
      test2,
      test3,
    });
    quest.save();
    return res.status(200).json(quest);
  } catch (error) {
    res.status(404).json({
      message: "Hubo un error",
    });
  }
};

async function testFunction(functionToTest) {
  try {
    eval(functionToTest);
    const test = jest.fn(() => {
      eval(functionToTest + `\n expect(fn()).toBe(result)`);
    });
    const result = await test();
    return { success: true, result };
  } catch (error) {
    return { success: false, error };
  }
}

const runCode = async (req = request, res = response) => {
  // const testFunction = eval(functionTest);
  let { test1, test2, test3 } = req.body;

  test1 = eval(test1);
  test2 = eval(test2);
  test3 = eval(test3);
  const separateFunction = eval(req.body.code.split("const myFunction =")[1]);
  const evaluate1 = separateFunction(test1[0]);
  const evaluate2 = separateFunction(test2[0]);
  const evaluate3 = separateFunction(test3[0]);
  res.json({
    test1: evaluate1 === test1[1] ? true : false,
    test2: evaluate2 === test2[1] ? true : false,
    test3: evaluate3 === test3[1] ? true : false,
  });
};

const updateQuestion = async (req = request, res = response) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const quest = await Question.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.json(quest);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Hubo un error",
    });
  }
};

module.exports = {
  createQuestion,
  getAllQuestion,
  createStageWithCode,
  testOne,
  testSecond,
  testThird,
  runCode,
  updateQuestion,
};
