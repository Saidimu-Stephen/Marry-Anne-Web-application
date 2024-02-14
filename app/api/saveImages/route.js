/** @format */

import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { saveMainImage } from "../../services/mainImageService";
import { saveMinorImages } from "../../services/minorImageService";

export async function POST(req) {
  try {
    await connectDB();

    const { selectedRoomName, mainImage, minorImages } = await req.json();

    // Save the main image
    const mainImageResponse = await saveMainImage(selectedRoomName, mainImage);

    // save the minor image
    const minorImageResponse = await saveMinorImages(
      selectedRoomName,
      minorImages
    );

    // Gather all responses and messages
    const responses = [mainImageResponse, minorImageResponse];
    const messages = responses.map((response) => response.message);

    // Check if any response indicates failure
    const hasFailure = responses.some((response) => !response.success);

    // Return appropriate response to the frontend
    if (hasFailure) {
      return NextResponse.json({ messages });
    } else {
      return NextResponse.json({
        messages: [...messages, "Images saved successfully"],
      });
    }

    // if (!mainImageResponse.success) {
    //   // If saving the main image failed, return the error response
    //   return NextResponse.json({
    //     message: mainImageResponse.message,
    //   });
    // }
    // if (!minorImageResponse.success) {
    //   // If saving the minor images failed, return the error response
    //   return NextResponse.json({
    //     message: minorImageResponse.message,
    //   });
    // }

    // // Both main and minor images were saved successfully
    // return NextResponse.json({
    //   message: "Images saved successfully",
    // });
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


//catch (error) {
//     console.error("Error:", error.message);

//     // Handle different types of errors
//     if (error instanceof mongoose.Error.ValidationError) {
//       let errorList = [];
//       for (let e in error.errors) {
//         errorList.push(error.errors[e].message);
//       }
//       console.log(errorList);
//       return NextResponse.json({ message: errorList });
//     } else if (error instanceof mongoose.Error.CastError) {
//       return NextResponse.json({ message: "Invalid ID provided." });
//     } else if (error.code === 11000 || error.code === 11001) {
//       return NextResponse.json({ message: "Duplicate key error." });
//     } else if (error.code === 11600) {
//       return NextResponse.json({ message: "Chunk error." });
//     } else {
//       return NextResponse.json({ message: "Unable to save images." });
//     }
//   }
// }
