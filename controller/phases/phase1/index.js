const { request, response } = require("express");
const PhaseOne = require("../../../models/phases/phase1");
const User = require("../../../models/auth");

const getPhase1 = async (req = request, res = response) => {
  try {
    const Phase = await PhaseOne.find().populate("user");

    res.status(200).json(Phase);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Hubo un error",
    });
  }
};

const createPhase1 = async (req = request, res = response) => {
  const { title, subtitle, resume, status, user } = req.body;

  try {
    const existPhase = await PhaseOne.find();
    if (existPhase.length > 0) {
      return res.status(400).json({
        message: "La fase 1 ya ha sido creada anteriormente",
      });
    } else {
      const Phase = new PhaseOne({ title, subtitle, resume });
      Phase.save();
      return res.json({
        message: "La fase 1 ha sido creada",
        phase: Phase,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Hubo un error",
    });
  }
};

const addUserToPhase1 = async (req = request, res = response) => {
  const { email, idPhase } = req.body;
  console.log({ email, idPhase });
  const Phase1 = await PhaseOne.findOne({ _id: idPhase });
  const user = await User.findOne({ email });
  Phase1.user = [...Phase1.user, user];
  Phase1.save();
  return res.json({
    message: "se ha agregado al usuario a la Fase 1",
  });
};

module.exports = {
  getPhase1,
  createPhase1,
  addUserToPhase1,
};
