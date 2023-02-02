const { Schema, model } = require("mongoose");

const QuestionSchema = Schema({
  description: {
    type: String,
    required: [true, "the description is required"],
  },
  image: {
    type: String,
    required: [true, "the image is required"],
  },
  answer: {
    type: String,
    required: [true, "the answer is required"],
  },
  phase1: {
    type: Schema.Types.ObjectId,
    ref: "Phase1",
    required: true,
  },
  alternatives: [
    {
      type: Schema.Types.ObjectId,
      ref: "Alternative",
      required: true,
    },
  ],
});

const QuestionModel = model("Question", QuestionSchema);

module.exports = QuestionModel;
