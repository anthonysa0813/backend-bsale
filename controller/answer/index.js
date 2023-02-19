const { request, response } = require("express");
const AnswerModel = require("../../models/answer");
const User = require("../../models/auth");
const { spawn } = require("child_process");

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

const validateTest = async (req, res) => {
  const { url } = req.body;
  try {
    // Ejecutar los tests de Cypress en la URL dada
    const cypressProcess = spawn("npx", [
      "cypress",
      "run",
      "--spec",
      "cypress/integration/test.spec.js",
      "--env",
      "URL_IDENTIFIER",
    ]);

    // Establecer la URL dinámicamente en tiempo de ejecución
    cypressProcess.stdout.on("data", (data) => {
      if (data.toString().includes("URL_IDENTIFIER")) {
        const urlEnv = `URL_IDENTIFIER=${url}`;
        cypressProcess.stdin.write(`${urlEnv}\n`);
      }
    });

    // Esperar a que los tests terminen de ejecutarse
    cypressProcess.on("exit", (code) => {
      // Si los tests se ejecutaron con éxito, enviar una respuesta 200 OK
      if (code === 0) {
        res.status(200).json({ success: true });
      }
      // Si los tests fallaron, enviar una respuesta 500 Internal Server Error
      else {
        res.status(500).json({ success: false });
      }
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  validateAnswer,
  addScore,
  validateTest,
};
