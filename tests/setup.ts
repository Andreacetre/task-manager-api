import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
jest.setTimeout(30000); // 30s para hooks

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
});

afterAll(async () => {
  await mongoose.connection.close();
});
