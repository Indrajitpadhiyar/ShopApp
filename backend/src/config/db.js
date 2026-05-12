import mongoose from "mongoose";
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

export default async function connectDB() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("Missing MONGO_URL in environment");
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed");
    throw err;
  }
}

