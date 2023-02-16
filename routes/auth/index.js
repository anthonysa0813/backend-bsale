const { Router } = require("express");
const {
  getAllUser,
  createUser,
  loginUser,
  searchUser,
  deleteUser,
  updateUser,
  logoutUser,
} = require("../../controller/auth/users");
const { check } = require("express-validator");
const validationFields = require("../../middlewares/validateFields");
const validateJWT = require("../../middlewares/validate-jwt");

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

// router.delete("/logout", validateJWT, logoutUser);

router.delete("/:uid", deleteUser);

router.get("/searchUser/:email", searchUser);

router.get("/searchUser", searchUser);

module.exports = router;
