require("dotenv").config();

import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL as string;

const connectDB = () => {
  return mongoose.connect(DATABASE_URL);
};

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection failed"));

export default connectDB;
