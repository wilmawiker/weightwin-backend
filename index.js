const express = require("express");
const mongoose = require("mongoose");
const exerciseRoutes = require("./src/routes/exerciseRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

app.use("/api/v1/exercises", exerciseRoutes);

const port = 4000;
async function run() {
  try {
    // Connect to MongoDB database (via Mongoose)
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(
      "mongodb+srv://test_user:test123@cluster0.ogxglsl.mongodb.net/weightwin"
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Start server; listen to requests on port
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run();
