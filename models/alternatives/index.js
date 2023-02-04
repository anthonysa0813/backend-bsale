const { Schema, model } = require("mongoose");

const AlternativeSchema = Schema({
  option: {
    type: String,
    required: [true, "the option is required"],
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
});

const AlternativeModel = model("Alternative", AlternativeSchema);

module.exports = AlternativeModel;
