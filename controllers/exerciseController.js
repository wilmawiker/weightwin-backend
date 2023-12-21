const Exercise = require("../models/Exercise");

exports.getAllExercises = async (req, res) => {
  try {
    let exercises = await Exercise.find();
    return res.json({
      data: exercises,
    });
  } catch (error) {
    console.log(error);
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
    res.json({ message: "Exercise added" });
  } catch (error) {
    next(error);
  }
};
