const express = require("express");
const { authenticate } = require("../middlewares/auth");
const { addWorkout, updateUser } = require("../controllers/userController");

const router = express.Router();

router.post("/workouts", authenticate, addWorkout);
router.put("/:id", authenticate, updateUser);

module.exports = router;
