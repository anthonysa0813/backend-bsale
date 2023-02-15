const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },
  status: {
    type: Boolean,
    required: false,
    default: false,
  },
  email: {
    type: String,
    required: [true, "el email es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "el password es obligatorio"],
  },
  score: {
    type: Number,
    require: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { _id, password, ...resto } = this.toObject();
  return {
    uid: _id,
    ...resto,
  };
};

const User = model("User", UserSchema);

module.exports = User;
