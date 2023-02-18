const { Router } = require("express");
const { validateAnswer } = require("../../controller/answer");

const router = Router();

router.post("/validateAnswer/:idQuestion/:idUser", validateAnswer);

module.exports = router;
