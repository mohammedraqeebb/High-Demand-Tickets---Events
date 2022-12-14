import mongoose from 'mongoose';
import { app } from './app';

const startServer = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be define');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('auth connected to its database');
  } catch (err) {
    console.log('error', err);
  }
  app.listen(4000, () => {
    console.log('Auth listens on port 4000!');
  });
};

startServer();
