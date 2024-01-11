import mongoose from 'mongoose';
import User from '../../../model/user.js';
import connectDB from '../../../db';

connectDB();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { email } = req.body;
    await User.deleteOne({ email });
    return res.status(200).json({ message: 'User Successfully signed out' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
