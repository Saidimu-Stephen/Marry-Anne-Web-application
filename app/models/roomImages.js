/** @format */

import mongoose from "mongoose";

const roomImages = new mongoose.Schema({
  selectedRoomName: {
    type: String,
    required: true,
    unique: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  minorImages: {
    type: [String],
    required: true,
  },
});

const Images = mongoose.models.Images || mongoose.model("Images", roomImages);

export default Images;
