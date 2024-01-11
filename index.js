const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const exerciseRoutes = require("./routes/exerciseRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
require("express-async-errors");

app.use(express.json());

app.use(
  cors({
    origin: ["https://weightwin-frontend.vercel.app/"],
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});
app.use("/exercises", exerciseRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

async function run() {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

run();

module.exports = app;
