const { request, response } = require("express");
const PhaseOne = require("../../../models/phases/phase1");

const getPhase1 = async (req = request, res = response) => {
  try {
    const Phase = await PhaseOne.find();

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
    const existPhase = await PhaseOne.findOne({ title });
    if (existPhase) {
      return res.status(400).json({
        message: "La fase 1 ya ha sido creada anteriormente",
      });
    } else {
      const Phase = new PhaseOne({ title, subtitle, resume });
      Phase.save();
      return res.json({
        message: "La fase 1 ha sido creada",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Hubo un error",
    });
  }
};

module.exports = {
  getPhase1,
  createPhase1,
};
