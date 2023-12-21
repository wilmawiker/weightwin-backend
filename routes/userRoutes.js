const express = require("express");
const { authenticate } = require("../middlewares/auth");
const { addWorkout } = require("../controllers/userController");

const router = express.Router();

router.post("/workouts", authenticate, addWorkout);

module.exports = router;
