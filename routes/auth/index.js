const { Router } = require("express");
const {
  getAllUser,
  createUser,
  loginUser,
  searchUser,
  deleteUser,
} = require("../../controller/auth/users");
const { check } = require("express-validator");
const validationFields = require("../../middlewares/validateFields");

const router = Router();

router.get("/allUsers", getAllUser);
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
  loginUser
);

router.delete("/:uid", deleteUser);

router.get("/searchUser", searchUser);

module.exports = router;
