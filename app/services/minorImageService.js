/** @format */

import connectDB from "../lib/mongodb";
import MinorImage from "../models/minorImageModel";
import { NextResponse } from "next/server";

export async function saveMinorImages(selectedRoomName, minorImages) {
  try {
    await connectDB();

    // Create the minor image object with selectedRoomName and minorImages array
    const minorImageObject = new MinorImage({
      selectedRoomName,
      minorImages,
    });

    // Save the minor image object to the database
    await minorImageObject.save();

    // console.log("Minor image saved successfully");

    return NextResponse.json({
      success: true,
      message: "Minor image saved successfully",
    });
  } catch (error) {
    console.error("Error saving minor image:", error.message);
    return NextResponse.json({
      success: false,
      message: "Unable to save minor image",
    });
  }
}
