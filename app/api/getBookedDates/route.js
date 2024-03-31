/** @format */

// pages/api/getBookedDates.js

import connectDB from "@/app/lib/mongodb";

import Booking from "../../models/bookedDates";
import { NextResponse } from "next/server";

export async function POST(req) {
  if (req.method === "POST") {
    try {
      await connectDB(); // Ensure database connection

      const { roomName } = await req.json(); // Access JSON data from the request body
      console.log(roomName);

      // Fetch booked dates for the specified room from the database
      const bookings = await Booking.find({ roomName });
console.log(bookings)
      if (!bookings) {
        return NextResponse.error({
          status: 404,
          message: "Booked dates not found for the specified room",
        });
      }

      return NextResponse.json(bookings); // Return fetched data as JSON response
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: "Internal Server Error" }); // Return error response
    }
  } else {
    return NextResponse.error({ status: 405, message: "Method Not Allowed" }); // Return method not allowed response
  }
}
