const { Router } = require("express");
const { validateAnswer } = require("../../controller/answer");

const router = Router();

router.post("/validateAnswer", validateAnswer);

module.exports = router;
