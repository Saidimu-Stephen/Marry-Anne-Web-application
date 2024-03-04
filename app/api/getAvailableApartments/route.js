/** @format */

import connectDB from "@/app/lib/mongodb";
// import Apartment from "../../models/apartment"; // Assuming your model is named "Apartment"
import ApartmentDetails from "../../models/apartment";
import { NextResponse } from "next/server";

export async function GET(req) {
  if (req.method === "GET") {
    try {
      await connectDB(); // Ensure database connection

      // Fetch all apartment details from the database
      const apartments = await ApartmentDetails.find({});

      return NextResponse.json(apartments); // Return fetched data as JSON response
    } catch (error) {
      console.error(error);
      return NextResponse.json({ msg: "Internal Server Error" }); // Return error response
    }
  } else {
    return NextResponse.error({ status: 405, message: "Method Not Allowed" }); // Return method not allowed response
  }
}
