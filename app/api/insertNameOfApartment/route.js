/** @format */

import connectDB from "@/app/lib/mongodb";
import Room from "../../models/roomDetails";  // Import the Room model
import { NextResponse } from "next/server";

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { nameOfApartment, roomName } = await req.json();
        await connectDB();
        console.log("name Of Apartment", nameOfApartment  , "Room Name", roomName)

      // Assuming there's a Room model with a nameOfApartment and roomName field
      await Room.updateMany({ roomName }, { $set: { nameOfApartment } });

      return NextResponse.json({
        msg: "Name of apartment saved successfully in room details",
      });
    } catch (error) {
      console.error(error.message);
      return NextResponse.json({
        msg: "Unable to save name of apartment in room details",
      });
    }
  } else {
    return NextResponse.json({ msg: "Method Not Allowed" });
  }
}
