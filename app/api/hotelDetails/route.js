/** @format */

import connectDB from "@/app/lib/mongodb";

import hotelDetails from "../../models/hotelDetails";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const {
    hotelName,
    selectedRoomType,
    description,
    roomServices,
    mainImage,
    images,
    // Add other fields as needed
  } = await req.json();

  try {
    await connectDB();

    // Create a new hotel entry with the provided data
    await hotelDetails.create({
      hotelName,
      selectedRoomType,
      description,
      roomServices,
      mainImage,
      images,
      // Add other fields as needed
    });

    return NextResponse.json({
      msg: ["Hotel details submitted successfully"],
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
      return NextResponse.json({ msg: ["Unable to submit hotel details."] });
    }
  }
}
