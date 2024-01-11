const mongoose = require('mongoose');
const User = require('./../../../model/user.js');
import connectDB from '../../../db';

connectDB(); // Connect to MongoDB

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { name, email, photo } = req.body;

    // Check if the user already exists
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // If user doesn't exist, create a new user instance
      const newUser = new User({
        name,
        email,
        photo,
      });

      // Save the user to the database
      const savedUser = await newUser.save();

      // Log the saved user
      console.log('User saved:', savedUser);

      // Respond with a success message or relevant data
      return res.status(200).json({ message: 'Authentication successful', user: savedUser });
    } else {
      // If user already exists, respond with user data
      return res.status(200).json({ user });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
