const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const generateJWT = require("../../helpers/generateJWT");
const Cookies = require("js-cookie");
const Admin = require("../../models/auth");

const getAllAdmin = async (req = request, res = response) => {
  res.status(200).json({
    message: "all admins",
  });
};

// create a new Admin
const createAdmin = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    // verificar si el usuario existe en la base de datos
    const checkAdmin = await Admin.findOne({ email });
    if (checkAdmin) {
      return res.status(401).json({
        message: "El Administrador ya existe en la base de datos",
      });
    }
    const admin = await new Admin({ email, password });

    // hashear el password
    const salt = await bcryptjs.genSaltSync();
    admin.password = await bcryptjs.hashSync(password, salt);
    // guardamos el usuario en la base de datos
    admin.save();

    res.status(200).json({
      message: "create Admin",
      admin,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateAdmin = async (req = request, res = response) => {
  res.status(200).json({
    message: "update Admin",
  });
};

const deleteAdmin = async (req = request, res = response) => {
  res.status(200).json({
    message: "delete Admin",
  });
};

const loginAdmin = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    // ver si el usuario existe en la base de datos
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        message: "El email no existe",
      });
    }

    // verificar la contraseña
    const isValidPassword = bcryptjs.compareSync(password, admin.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "El password es inválido",
      });
    }

    // si es válido el password, vamos a generar el token.
    const token = await generateJWT(admin.uid);
    // Cookies.set("token", token, {expires: 7})

    return res.status(200).json({
      admin,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

module.exports = {
  getAllAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
};
