/** @format */

import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/users";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

/**
 * Handles POST request to submit contact form data.
 * @param {Object} req - HTTP request object containing form data
 * @returns {Object} JSON response indicating success or error
 */
export async function POST(req) {
  const {
    firstName,
    lastName,
    username,
    email,
    phoneNumber,
    gender,
    password,
    confirmPassword,
  } = await req.json();

  try {
    await connectDB();
    await User.create({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      gender,
      password,
      confirmPassword,
    });

    return NextResponse.json({
      msg: ["User register succsfully"],
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
