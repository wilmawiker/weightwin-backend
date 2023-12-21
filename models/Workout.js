const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  exercises: {
    type: [
      {
        exerciseId: {
          type: String,
          required: true,
        },
        sets: {
          type: [
            {
              reps: {
                type: Number,
                required: true,
              },
              weight: {
                type: Number,
                required: true,
                default: 0,
                min: 0,
              },
            },
          ],
          required: true,
        },
      },
    ],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Workout", WorkoutSchema);
