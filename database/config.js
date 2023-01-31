const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_CNN);
    console.log("Se conectó a la base de datos :D");
  } catch (error) {
    throw new Error("Hubo un error en la conexión a la base de datos....");
  }
};

module.exports = connectDB;
