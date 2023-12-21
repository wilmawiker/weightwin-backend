const { default: mongoose } = require("mongoose");
const app = require("..");
const Set = require("../models/Set");
const User = require("../models/User");
const Workout = require("../models/Workout");

exports.addWorkout = async (req, res, next) => {
  const {
    date,
    exercises: [
      {
        exerciseId,
        sets: [{ reps, weight }],
      },
    ],
  } = req.body;
  try {
    const workout = new Workout({
      userId: req.user.id,
      exercises: [
        {
          exerciseId,
          sets: [{ reps, weight }],
        },
      ],
      date,
    });

    await workout.save();

    const history = new Set.History({
      userId: req.user.id,
      exerciseId,
      reps,
      weight,
    });

    await history.save();

    if (reps <= 10) {
      let cursor = mongoose.connection.db
        .collection("records")
        .find({ reps: reps });
      console.log(cursor);
      const record = new Set.Record({
        userId: req.user.id,
        exerciseId,
        reps,
        weight,
      });
      await record.save();
    }
    res.json({ message: "Workout added" });
  } catch (error) {
    next(error);
  }
};
