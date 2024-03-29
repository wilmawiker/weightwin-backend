const Exercise = require("../models/Exercise");

exports.getAllExercises = async (req, res) => {
  const exercises = await Exercise.find();
  return res.json({
    data: exercises,
  });
};

exports.getExerciseById = async (req, res) => {
  const exerciseId = req.params.id;
  try {
    let exercises = await Exercise.findById(exerciseId);
    return res.json({
      data: exercises,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.addExercise = async (req, res, next) => {
  const { name, primary, secondary, videoUrl, description, instructions } =
    req.body;
  try {
    const exercise = new Exercise({
      name,
      primary,
      secondary,
      videoUrl,
      description,
      instructions,
    });

    await exercise.save();
    return res.json({ message: "Exercise added" });
  } catch (error) {
    next(error);
  }
};
