const { Schema, model } = require("mongoose");

const AlternativeSchema = Schema({
  option: {
    type: String,
    required: [true, "the option is required"],
  },
  questionRef: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
});

AlternativeSchema.methods.toJSON = function () {
  const { _id: id, __v, ...rest } = this.toObject();
  return {
    id,
    ...rest,
  };
};

const AlternativeModel = model("Alternative", AlternativeSchema);

module.exports = AlternativeModel;
