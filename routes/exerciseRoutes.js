const express = require("express");
const router = express.Router();
const {
  getAllExercises,
  addExercise,
} = require("../controllers/exerciseController");

router.get("/", getAllExercises);
router.post("/", addExercise);

module.exports = router;
