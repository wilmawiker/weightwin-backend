const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  primary: {
    type: [],
  },
  secondary: {
    type: [],
  },
  videoUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  instructions: {
    type: String,
  },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
