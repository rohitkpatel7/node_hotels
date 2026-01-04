const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

// Connect to MongoDB (NO deprecated options)
mongoose.connect(mongoURL)
  .then(() => {
    console.log('Mongoose connected to ' + mongoURL);
  })
  .catch((err) => {
    console.error('Mongoose connection error:', err);
  });

// Get the default connection
const db = mongoose.connection;

// Optional: connection event listeners
db.on('disconnected', () => {
  console.log('Mongoose disconnected'); 
});

// Export the connection
module.exports = db;
