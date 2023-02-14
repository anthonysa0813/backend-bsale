const { Router } = require("express");
const {
  getAllUser,
  createUser,
  loginUser,
  searchUser,
  deleteUser,
  updateUser,
} = require("../../controller/auth/users");
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
    check("name", "el nombre es requerido").not().isEmpty(),
    validationFields,
  ],
  createUser
);

router.put("/update/:uid", updateUser);

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

router.get("/searchUser/:email", searchUser);

router.get("/searchUser", searchUser);

module.exports = router;
