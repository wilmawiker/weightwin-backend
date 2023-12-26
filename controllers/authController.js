const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Register a new user
exports.register = async (req, res, next) => {
  const {
    email,
    username,
    gender,
    dateOfBirth,
    password,
    workouts,
    history,
    records,
  } = req.body;

  try {
    const user = new User({
      email,
      username,
      gender,
      dateOfBirth,
      password,
      workouts,
      history,
      records,
    });
    console.log(user);
    await user.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);
    console.log(passwordMatch);
    console.log(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
};
