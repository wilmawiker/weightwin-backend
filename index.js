const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const exerciseRoutes = require("./routes/exerciseRoutes");

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});
console.log("test");
app.use("/api/v1/exercises", exerciseRoutes);

// Connect to MongoDB database (via Mongoose)
mongoose.set("strictQuery", false);
const conn = mongoose.connect(process.env.MONGODB_URI);

// Start server; listen to requests on port
app.listen(port, () => {
  console.log(`Server running on ${port}, http://localhost:${port}`);
});

// Export the Express API
module.exports = app;
