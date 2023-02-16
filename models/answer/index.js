const { Schema, model } = require("mongoose");

const AnswerSchema = Schema({
  value: {
    type: String,
    require: [true, "the value is required"],
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    require: [true, "the question is required"],
  },
});

AnswerSchema.methods.toJSON = function () {
  const { _id: id, __v, ...rest } = this.toObject();
  return {
    id,
    ...rest,
  };
};

const AnswerModel = model("Answer", AnswerSchema);

module.exports = AnswerModel;
