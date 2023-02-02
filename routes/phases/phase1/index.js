const { Router } = require("express");
const {
  getPhase1,
  createPhase1,
} = require("../../../controller/phases/phase1");
const { check } = require("express-validator");
const validationFields = require("../../../middlewares/validateFields");

const router = Router();

router.get("", getPhase1);

router.post(
  "/",
  [
    check("title", "el title es requerido").not().isEmpty(),
    check("subtitle", "el subtitle es requerido").not().isEmpty(),
    check("resume", "el subtitle es requerid,o").not().isEmpty(),
    check("user", "el user es requerido").isMongoId(),
    check("role", "role invalido").isIn(["admin"]),
    validationFields,
  ],
  createPhase1
);

// export default router
module.exports = router;
