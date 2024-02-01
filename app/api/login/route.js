/** @format */

import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/users";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import the jwt module
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
    userName,

    password,
  } = await req.json();
  console.log(userName, password);

  try {
    // Establish connection to the database
    await connectDB();

    // Find user by username in the database
    const user = await User.findOne({ username: userName });

    // Check if the user was not found
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Return a response indicating invalid user credentials (status code: 401)
      return NextResponse.json(
        { msg: ["Invalid login credentials"], success: false },
        { status: 401 }
      );
    }

    // Generate a JWT token if the username and password are valid
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });
    // Assuming 'token' is received in the login response

    // Return a successful response with token and user data (status code: 200)
    return NextResponse.json({
      msg: ["User logged in successfully"],
      success: true,
      token: token,
      userData: {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,

        // ...other relevant user data
      },
    });
  } catch (error) {
    // Handle errors and return an error response (status code: 500)
    console.error(error);
    return NextResponse.json(
      { msg: ["Unable to perform login"], success: false },
      { status: 500 }
    );
  }
}
