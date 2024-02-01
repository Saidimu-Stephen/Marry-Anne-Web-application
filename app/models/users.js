/** @format */

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required."],
    trim: true,
    minLength: [2, "First name must be larger than 2 characters"],
    maxLength: [50, "First name must be lesser than 50 characters"],
  },

  lastName: {
    type: String,
    required: [true, "Last name is required."],
    trim: true,
    minLength: [2, "Last name must be larger than 2 characters"],
    maxLength: [50, "Last name must be lesser than 50 characters"],
  },

  username: {
    type: String,
    required: [true, "Username is required."],
    unique: [true, "Username already in use"],
    trim: true,
    minLength: [6, "Username must be larger than 6 characters"],
    maxLength: [20, "Username must be lesser than 20 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email alraedy in use"],
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please enter a valid email",
    ],
  },

  phoneNumber: {
    type: String,
    required: [true, "Phone number is required."],
  },

  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "Gender is required."],
  },

  password: {
    type: String,
    required: [true, "Password is required."],
    minLength: [8, "Password must be at least 8 characters long"],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
