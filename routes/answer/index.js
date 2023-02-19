const { Router } = require("express");
const { validateAnswer, addScore } = require("../../controller/answer");

const router = Router();

router.post("/validateAnswer/:idQuestion/:idUser", validateAnswer);

router.get("/addScore/:idUser", addScore);

module.exports = router;
