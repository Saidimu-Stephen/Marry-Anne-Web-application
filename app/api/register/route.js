/** @format */

import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/users";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * Handles POST request to submit contact form data.
 * @param {Object} req - HTTP request object containing form data
 * @returns {Object} JSON response indicating success or error
 */
export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.error({
      status: 405,
      message: "Method Not Allowed",
    });
  }
  const {
    firstName,
    lastName,
    username,
    email,
    phoneNumber,
    gender,
    password,
  } = await req.json();

  try {
    await connectDB();

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // Adjust the saltRounds as needed

    await User.create({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      gender,
      password: hashedPassword, // Store the hashed password in the database
    });

    return NextResponse.json({
      msg: ["User registered successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json({ msg: ["Unable to register user."] });
    }
  }
}
