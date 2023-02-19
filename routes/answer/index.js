const { Router } = require("express");
const {
  validateAnswer,
  addScore,
  validateTest,
} = require("../../controller/answer");

const router = Router();

router.post("/validateAnswer/:idQuestion/:idUser", validateAnswer);

router.get("/addScore/:idUser", addScore);

router.post("/run-test", validateTest);

module.exports = router;
