const mongoose = require("mongoose");

const SetSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  exerciseId: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

const Record = mongoose.model("Record", SetSchema);
const History = mongoose.model("History", SetSchema);

module.exports = { Record, History };
