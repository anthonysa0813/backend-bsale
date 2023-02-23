const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    require: [false, "el nombre es obligatorio"],
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
    default: 0,
  },
  stars: {
    type: Number,
    required: false,
    default: 0,
  },
  ownerComment1: {
    type: String,
    required: false,
  },
  ownerComment2: {
    type: String,
    required: false,
  },
  phase1Active: {
    type: Boolean,
    default: false,
    required: false,
  },
  phase3Active: {
    type: Boolean,
    default: false,
    required: false,
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
