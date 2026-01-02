import mongoose from "mongoose";

let isDbConnected = false;

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    isDbConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    isDbConnected = false;
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export const getDbStatus = () => isDbConnected;
export default connectDB;
