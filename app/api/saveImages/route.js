/** @format */

import connectDB from "@/app/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { saveMainImage } from "../../services/mainImageService";
import MainImage from "@/app/models/mainImageModel";

import MinorImage from "../../models/minorImageModel";

import { saveMinorImages } from "../../services/minorImageService";
// import MainImage from "../models/mainImageModel";

export async function POST(req) {
  try {
    await connectDB();

    const { selectedRoomName, mainImage, minorImages } = await req.json();

    // Save the main image
    const mainImageResponse = await MainImage.create({
      selectedRoomName,
      mainImage,
    });

    // Save the minor images
    const minorImageObject = new MinorImage({
      selectedRoomName,
      minorImages,
    });
    await minorImageObject.save();

    // Check if both main image and minor images saving failed
    if (!mainImageResponse) {
      // Handle the case where main image saving failed
      return NextResponse.json({ messages: ["Failed to save main image."] });
    } else if (!minorImageObject) {
      // Handle the case where minor images saving failed
      return NextResponse.json({ messages: ["Failed to save minor images."] });
    }

    // All images saved successfully
    return NextResponse.json({ messages: ["Images saved successfully."] });
  } catch (error) {
    console.error("Error:", error.message);

    // Handle different types of errors and return appropriate response
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ messages: errorList });
    } else if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json({ messages: ["Invalid ID provided."] });
    } else if (error.code === 11000 || error.code === 11001) {
      return NextResponse.json({ messages: ["Duplicate key error."] });
    } else if (error.code === 11600) {
      return NextResponse.json({ messages: ["Chunk error."] });
    } else {
      return NextResponse.json({ messages: ["Unable to save images."] });
    }
  }
}
