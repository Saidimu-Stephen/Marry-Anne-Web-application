/** @format */

import connectDB from "@/app/lib/mongodb";
import Booking from "../../models/bookedDates"; // Import the Booking model
import { NextResponse } from "next/server";
import mongoose from "mongoose";

/**
 * Handles POST request to book a date.
 * @param {Object} req - HTTP request object containing booking data
 * @returns {Object} JSON response indicating success or error
 */
export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.error({
      status: 405,
      message: "Method Not Allowed",
    });
  }

  const { checkInDate, checkOutDate, roomName, myBookingDates } =
    await req.json(); // Extract checkInDate, checkOutDate, and roomName from request body

  try {
    await connectDB();

    // Create a new booking document and save it to the database
    await Booking.create({
      checkInDate,
      checkOutDate, // Assuming date in the Booking model corresponds to check-in date
      roomName,
      bookedDates: myBookingDates,
    });

    return NextResponse.json({
      msg: ["Booking successful"],
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
      return NextResponse.json({ msg: ["Unable to book date."] });
    }
  }
}
