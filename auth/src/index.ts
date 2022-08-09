import mongoose from 'mongoose';
import { app } from './app';

const startServer = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be define');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('auth connected to its database');
  } catch (err) {
    console.log('error', err);
  }
  app.listen(4000, () => {
    console.log('Auth listens on port 4000!');
  });
};

startServer();
