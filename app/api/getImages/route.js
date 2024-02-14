/** @format */

import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import roomImages from "../../models/roomImages";

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.error({
      status: 405,
      message: "Method not allowed",
    });
  }

  try {
    await connectDB();
    const { room_Name } = await req.json();
    console.log(room_Name);

    // Find room images based on room name
    const images = await roomImages.find({ selectedRoomName: room_Name });

    if (images.length === 0) {
      return NextResponse.error({
        status: 404,
        message: "Room images not found",
      });
    }

    // Connect to the GridFS bucket
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db);

    // Fetch and prepare the actual images
    const mainImages = [];
    const minorImages = [];

    for (const image of images) {
      const mainImageData = await getImageData(bucket, image.mainImage);
      mainImages.push({ mainImage: mainImageData });

      const minorImagePromises = image.minorImages.map(async (minorImage) => {
        const minorImageData = await getImageData(bucket, minorImage);
        return minorImageData;
      });

      const resolvedMinorImages = await Promise.all(minorImagePromises);
      minorImages.push(resolvedMinorImages);
    }

    console.log("Main images", mainImages);
    console.log("Minor images", minorImages);

    return NextResponse.json({ mainImages, minorImages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Internal Server Error" });
  }
}

async function getImageData(bucket, imageId) {
  return new Promise((resolve, reject) => {
    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(imageId)
    );
    let imageData = Buffer.from("");
    downloadStream.on("data", (chunk) => {
      imageData = Buffer.concat([imageData, chunk]);
    });
    downloadStream.on("end", () => {
      resolve(imageData.toString("base64"));
    });
    downloadStream.on("error", (error) => {
      reject(error);
    });
  });
}
