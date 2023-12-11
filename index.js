require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const exerciseRoutes = require("./src/routes/exerciseRoutes");
const app = express();
const PORT = 4000;

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.get("/api/v1/exercises", exerciseRoutes);

async function run() {
  try {
    // Connect to MongoDB database (via Mongoose)
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Start server; listen to requests on port
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run();

// Export the Express API
module.exports = app;
