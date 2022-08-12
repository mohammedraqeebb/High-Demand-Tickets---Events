import mongoose from 'mongoose';
import { app } from './app';

const startServer = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('tickets connected to its database');
  } catch (err) {
    console.log('error', err);
  }
  app.listen(5000, () => {
    console.log('tickets listens on port 5000!');
  });
};

startServer();
