import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

const options: mongoose.ConnectOptions = {
  bufferCommands: true,
  autoCreate: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

interface MongoDBError extends Error {
  name: string;
  code?: number;
}

async function connectDB(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Using existing MongoDB connection");
      return;
    }

    await mongoose.connect(MONGODB_URI, options);
    console.log("Connected to MongoDB");
  } catch (error) {
    if (error instanceof Error) {
      const mongoError = error as MongoDBError;
      console.error("Error connecting to MongoDB:", mongoError.message);
      throw mongoError;
    }
    throw error;
  }
}

export default connectDB;
