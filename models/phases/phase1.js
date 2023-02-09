const { Schema, model } = require("mongoose");

const Phase1Schema = Schema(
  {
    title: {
      type: String,
      required: [true, "the field title is required"],
    },
    subtitle: {
      type: String,
      required: [true, "the field subtitle is required"],
    },
    resume: {
      type: String,
      required: [true, "the field resume is required"],
    },
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    ],
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

Phase1Schema.methods.toJSON = function () {
  const { _id: id, __v, ...rest } = this.toObject();
  return {
    id,
    ...rest,
  };
};

const modelPhase1 = model("Phase1", Phase1Schema);

module.exports = modelPhase1;
