import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vbs';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default connectDB;
