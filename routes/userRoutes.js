const express = require("express");
const { authenticate } = require("../middlewares/auth");
const {
  addWorkout,
  updateUser,
  getUserHistory,
  getUserRecords,
} = require("../controllers/userController");

const router = express.Router();

router.post("/workouts", authenticate, addWorkout);
router.put("/:id", authenticate, updateUser);
router.get("/:id/history", authenticate, getUserHistory);
router.get("/:id/record", authenticate, getUserRecords);

module.exports = router;
