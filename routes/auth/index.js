const { Router } = require("express");
const { getAllUser, createUser, login } = require("../../controller/auth");
const { check } = require("express-validator");
const validationFields = require("../../middlewares/validateFields");

const router = Router();

router.get("/", getAllUser);
router.post(
  "/signup",
  [
    check("email", "el email es incorrecto ó está vacío")
      .isEmail()
      .not()
      .isEmpty(),
    check("password", "el password es requerido").not().isEmpty(),
    validationFields,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("email", "el email es requerido").isEmail().not().isEmpty(),
    check("password", "el password es requerido").not().isEmpty(),
    validationFields,
  ],
  login
);

module.exports = router;
