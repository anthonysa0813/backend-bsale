const { Schema, model } = require("mongoose");

const QuestionSchema = Schema({
  description: {
    type: String,
    required: [true, "the description is required"],
  },
  image: {
    type: String,
    required: false,
  },
  answer: {
    type: String,
    required: false,
  },
  codeFunc: {
    type: String,
    required: false,
  },
  phase1: {
    type: Schema.Types.ObjectId,
    ref: "Phase1",
    required: true,
  },
  type: {
    type: String,
    required: [true, "the type is required"],
    enum: ["select", "code"],
    default: "select",
  },
  alternatives: [
    {
      type: Schema.Types.ObjectId,
      ref: "Alternative",
      required: false,
    },
  ],
  test1: {
    type: String,
    required: false,
  },
  test2: {
    type: String,
    required: false,
  },
  test3: {
    type: String,
    required: false,
  },
});

QuestionSchema.methods.toJSON = function () {
  const { _id: id, __v, ...rest } = this.toObject();
  return {
    id,
    ...rest,
  };
};

const QuestionModel = model("Question", QuestionSchema);

module.exports = QuestionModel;
