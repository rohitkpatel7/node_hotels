const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection URL

//local mongodb compass database
// const mongoURL = process.env.MONGODB_URL_LOCAL;

//cloud mongodb atlas database
const mongoURL = process.env.MONGODB_URL;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("connected to MongoDB server");
  })
  .catch((err) => {
    console.error("Mongoose connection error:", err);
  });

// Get the default connection
const db = mongoose.connection;

// Optional: connection event listeners
db.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Export the connection
module.exports = db;
