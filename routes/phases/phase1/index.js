const { Router } = require("express");
const {
  getPhase1,
  createPhase1,
  addUserToPhase1,
} = require("../../../controller/phases/phase1");
const { check } = require("express-validator");
const validationFields = require("../../../middlewares/validateFields");
const {
  createQuestion,
  getAllQuestion,
  createStageWithCode,
  runCode,
} = require("../../../controller/questions");

const router = Router();

router.get("/", getPhase1);

router.post(
  "/",
  [
    check("title", "el title es requerido").not().isEmpty(),
    check("subtitle", "el subtitle es requerido").not().isEmpty(),
    check("resume", "el subtitle es requerid,o").not().isEmpty(),
    validationFields,
  ],
  createPhase1
);

router.put("/addUser", addUserToPhase1);

router.put("/", (re, res) => {
  res.json({
    message: "PUT request",
  });
});

router.delete("/", (re, res) => {
  res.json({
    message: "DELETE request",
  });
});

// create Questions
router.post("/question", createQuestion);

router.post("/questionWithCode", createStageWithCode);

router.post("/run-code", runCode);

router.get("/question", getAllQuestion);

// export default router
module.exports = router;
