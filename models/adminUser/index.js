const { Schema, model } = require("mongoose");

const AdminSchema = Schema({
  name: {
    type: String,
    require: false,
  },
  status: {
    type: Boolean,
    require: false,
    default: false,
  },
  email: {
    type: String,
    require: [true, "el email es obligatorio"],
  },
  password: {
    type: String,
    require: [true, "el password es obligatorio"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",
  },
});

AdminSchema.methods.toJSON = function () {
  const { _id, password, name, status, email } = this.toObject();
  return {
    uid: _id,
    email,
    name,
    status,
  };
};

const Admin = model("Admin", AdminSchema);

module.exports = Admin;
