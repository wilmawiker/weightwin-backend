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
        },
        name: {
          type: String,
        },
        set: {
          type: [
            {
              id: {
                type: Number,
              },
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
  planned: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Workout", WorkoutSchema);
