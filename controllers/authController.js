const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

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
    await user.save();
    return res.json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    });
    return res.json({ token: token, data: user });
  } catch (error) {
    next(error);
  }
};
