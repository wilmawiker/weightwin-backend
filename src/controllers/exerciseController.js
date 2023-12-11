const Exercise = require("../models/Exercise");

exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    if (!Exercise) throw new NotFoundError("No exercises found");
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
