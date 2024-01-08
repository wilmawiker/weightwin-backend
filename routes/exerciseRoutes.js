const express = require("express");
const router = express.Router();
const {
  getAllExercises,
  addExercise,
  getExerciseById,
} = require("../controllers/exerciseController");

router.get("/", getAllExercises);
router.get("/:id", getExerciseById);
router.post("/", addExercise);

module.exports = router;
