import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
}

let mongo: any;
jest.mock('../nats-wrapper');
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfsdfsd';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

global.signin = () => {
  const payload = {
    id: new mongoose.Types.ObjectId(),
    email: 'test@test.com',
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = {
    jwt: token,
  };
  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');
  return [`session=${base64}`];
};
