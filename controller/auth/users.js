const { request, response } = require("express");
const User = require("../../models/auth");
const bcryptjs = require("bcryptjs");
const generateJWT = require("../../helpers/generateJWT");
const Cookies = require("js-cookie");

const getAllUser = async (req = request, res = response) => {
  try {
    const users = await User.find().exec();
    return res.json(users);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Hubo un error al traer todos los usuarios",
    });
  }
};

const searchUser = async (req = request, res = response) => {
  try {
    // const { email } = req.body;
    const { email } = req.params;

    const user = await User.findOne({ email });
    return res.json(user);
  } catch (error) {
    res.status(404).json({
      message: "Hubo un error",
    });
  }
};

// create a new user
const createUser = async (req = request, res = response) => {
  try {
    const { name, email, password } = req.body;

    // verificar si el usuario existe en la base de datos
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(401).json({
        message: "El usuario ya existe en la base de datos",
      });
    }
    const user = await new User({ name, email, password });

    // hashear el password
    const salt = await bcryptjs.genSaltSync();
    user.password = await bcryptjs.hashSync(password, salt);
    // guardamos el usuario en la base de datos
    user.save();

    res.status(200).json({
      message: "create user",
      user,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (req = request, res = response) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ _id: req.params.uid });
    if (!user) {
      return res.status(404).json({
        message: "El usuario no se encontró en la base de datos",
      });
    }
    user.name = name;
    user.email = email;
    user.password = password;

    await user.save();
    return res.status(200).json({
      message: "El usuario se actualizó con éxito",
      data: user,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (req = request, res = response) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.uid });

    if (!user) {
      return res.status(400).json({
        message: "No se encontro el usuario con el id especificado",
      });
    }

    return res.status(200).json({
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error al intentar eliminar el usuario",
    });
  }
};

const loginUser = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    // ver si el usuario existe en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "El email no existe",
      });
    }

    // verificar la contraseña
    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "El password es inválido",
      });
    }

    // si es válido el password, vamos a generar el token.
    const token = await generateJWT(user.uid);
    // Cookies.set("token", token, {expires: 7})

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  searchUser,
};
