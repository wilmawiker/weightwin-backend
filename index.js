// const express = require("express");
// require("dotenv").config();
// const app = express();
// const port = process.env.PORT || 3000;
// const mongoose = require("mongoose");
// const exerciseRoutes = require("./routes/exerciseRoutes");

// app.get("/home", (req, res) => {
//   res.status(200).json("Welcome, your app is working well");
// });
// console.log("test");
// app.use("/api/v1/exercises", exerciseRoutes);

// async function run() {
//   try {
//     // Connect to MongoDB database (via Mongoose)
//     mongoose.set("strictQuery", false);
//     const conn = await mongoose.connect(process.env.MONGODB_URI);
//     console.log(`MongoDB connected: ${conn.connection.host}`);

//     // Start server; listen to requests on port
//     app.listen(port, () => {
//       console.log(`Server running on ${port}, http://localhost:${port}`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// run();

// // Export the Express API
// module.exports = app;

import express from "express";
import dotenv from "dotenv";
import { getExercises } from "exercises.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/exercises", getExercises);

app.listen(port, () => {
  console.log(`Server running on ${port}, http://localhost:${port}`);
});
