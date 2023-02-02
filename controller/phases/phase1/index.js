const { request, response } = require("express");
const Phase1 = require("../../../models/phases/phase1");

const getPhase1 = (req = request, res = response) => {
  res.status(200).json({
    message: "get phase ",
  });
};

const createPhase1 = async (req = request, res = response) => {
  const { title, subtitle, resume, status, user } = req.body;

  const phase1 = await new Phase1({
    title,
    subtitle,
    resume,
    status,
    user,
  });

  res.json(phase1);
};

module.exports = {
  getPhase1,
  createPhase1,
};
