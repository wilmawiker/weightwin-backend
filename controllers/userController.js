const { default: mongoose } = require("mongoose");
const app = require("..");
const Set = require("../models/Set");
const User = require("../models/User");
const Workout = require("../models/Workout");
const bcrypt = require("bcrypt");

exports.addWorkout = async (req, res, next) => {
  const { exercises, planned } = req.body;
  try {
    const workout = new Workout({
      userId: req.user.id,
      exercises,
      planned,
    });

    exercises.forEach((exercise) => {
      exercise.set.forEach(async (set) => {
        const history = new Set.History({
          userId: req.user.id,
          exerciseId: exercise.exerciseId,
          exerciseName: exercise.name,
          reps: set.reps,
          weight: set.weight,
        });

        if (set.reps <= 10 && set.reps > 0) {
          let document = {};
          let foundDoc = false;
          let cursor = mongoose.connection.db
            .collection("records")
            .find({ reps: set.reps });
          for await (const doc of cursor) {
            console.log(doc);
            document = doc;
            foundDoc = true;
          }

          if (foundDoc === false) {
            const record = new Set.Record({
              userId: req.user.id,
              exerciseId: exercise.exerciseId,
              reps: set.reps,
              weight: set.weight,
            });
            await record.save();
          }

          if (document.weight < set.weight) {
            mongoose.connection.db
              .collection("records")
              .findOneAndDelete({ reps: set.reps });

            const record = new Set.Record({
              userId: req.user.id,
              exerciseId: exercise.exerciseId,
              exerciseName: exercise.name,
              reps: set.reps,
              weight: set.weight,
            });
            await record.save();
          }
        }

        await history.save();
      });
    });

    await workout.save();

    return res.json({ message: "Workout added" });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email, username, gender, dateOfBirth, password } = req.body;
    const userId = req.params.id;

    if (!email && !username && !gender && !dateOfBirth && !password) {
      return res.status(400).json({
        message: "Must provide something to update!",
      });
    }

    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return res.sendStatus(404);
    }

    if (email) userToUpdate.email = email;
    if (username) userToUpdate.username = username;
    if (gender) userToUpdate.gender = gender;
    if (dateOfBirth) userToUpdate.dateOfBirth = dateOfBirth;
    if (password) userToUpdate.password = password;

    await userToUpdate.save();
    return res.json(userToUpdate);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUserHistory = async (req, res) => {
  const userId = req.params.id;

  let cursor = mongoose.connection.db
    .collection("histories")
    .find({ userId: userId })
    .limit(20)
    .sort({ _id: -1 });

  const history = await cursor.toArray();

  console.log(history);

  return res.json(history);
};

exports.getUserRecords = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  let cursor = mongoose.connection.db
    .collection("records")
    .find({ userId: userId })
    .limit(30)
    .sort({ reps: 1 });

  const records = await cursor.toArray();

  return res.json(records);
};

exports.getPlannedWorkouts = async (req, res) => {
  const userId = req.params.id;

  let cursor = mongoose.connection.db
    .collection("workouts")
    .find({ userId: userId, planned: true });

  const plannedWorkouts = await cursor.toArray();

  return res.json(plannedWorkouts);
};
