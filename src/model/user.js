const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    // You can add more validation rules for the photo URL if needed
  },
});

// Create the User model
const User = mongoose.model('usersGoogle', userSchema);

module.exports = User;
