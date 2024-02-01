/** @format */

import connectDB from "@/app/lib/mongodb";
import roomImages from "../../models/roomImages";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import sharp from "sharp";

export async function POST(req) {
  try {
    await connectDB();

    const { selectedRoomName, mainImage, minorImages } = await req.json();

    // Process and resize images
    const processedMinorImages = await Promise.all(
      minorImages.map(async (imageBase64) => {
        try {
          const resizedImageBuffer = await sharp(
            Buffer.from(imageBase64, "base64")
          )
            .resize({ width: 800 }) // Adjust width as needed
            .toBuffer();
          return resizedImageBuffer.toString("base64");
        } catch (error) {
          console.error("Error processing image:", error);
          return null; // or handle error in an appropriate manner
        }
      })
    );

    // Save images to database
    const newRoomImages = new roomImages({
      selectedRoomName,
      mainImage,
      minorImages: processedMinorImages.filter(Boolean), // Filter out any null values
      // Add other fields as needed
    });

    await newRoomImages.save();

    return NextResponse.json({
      msg: "Images saved successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error.message);

    // Check for specific MongoDB error codes
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else if (error instanceof mongoose.Error.CastError) {
      // Handle CastError (e.g., invalid ObjectId)
      return NextResponse.json({ msg: "Invalid ID provided." });
    } else if (error.code === 11000 || error.code === 11001) {
      // Handle duplicate key error (MongoError: E11000 duplicate key error)
      return NextResponse.json({ msg: "Duplicate key error." });
    } else if (error.code === 11600) {
      // Handle MongoDB chunk error
      return NextResponse.json({ msg: "Chunk error." });
    } else {
      // Handle other MongoDB errors
      return NextResponse.json({ msg: "Unable to save images." });
    }
  }
}

// /** @format */

// import connectDB from "@/app/lib/mongodb";
// import roomImages from "../../models/roomImages";
// import { NextResponse } from "next/server";
// import mongoose from "mongoose";

// export async function POST(req) {
//   try {
//     await connectDB();

//     // const { selectedRoomName, mainImage, minorImages } = await req.json();
//     const { selectedRoomName, mainImage, minorImages } = await req.json();

//     console.log(typeof selectedRoomName);
//     console.log(typeof mainImage);
//     console.log(typeof minorImages);
//     // Save images to database
//     const newRoomImages = new roomImages({
//       selectedRoomName,
//       mainImage,
//       minorImages,
//       // Add other fields as needed
//     });

//     await newRoomImages.save();

//     return NextResponse.json({
//       msg: "Images saved successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error:", error.message);

//     // Check for specific MongoDB error codes
//     if (error instanceof mongoose.Error.ValidationError) {
//       let errorList = [];
//       for (let e in error.errors) {
//         errorList.push(error.errors[e].message);
//       }
//       console.log(errorList);
//       return NextResponse.json({ msg: errorList });
//     } else if (error instanceof mongoose.Error.CastError) {
//       // Handle CastError (e.g., invalid ObjectId)
//       return NextResponse.json({ msg: "Invalid ID provided." });
//     } else if (error.code === 11000 || error.code === 11001) {
//       // Handle duplicate key error (MongoError: E11000 duplicate key error)
//       return NextResponse.json({ msg: "Duplicate key error." });
//     } else if (error.code === 11600) {
//       // Handle MongoDB chunk error
//       return NextResponse.json({ msg: "Chunk error." });
//     } else {
//       // Handle other MongoDB errors
//       return NextResponse.json({ msg: "Unable to save images." });
//     }
//   }
// }
// // /**
