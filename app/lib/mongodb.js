/** @format */

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        "mongodb+srv://marryanne:c8MOzqj4n5QC8bRk@cluster0.def3tdg.mongodb.net/sherryhomes"
      );
      console.log("db connected");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
