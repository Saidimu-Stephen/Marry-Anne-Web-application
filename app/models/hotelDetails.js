/** @format */

import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema({
  hotelName: {
    type: String,
    required: [true, "Hotel name is required."],
    trim: true,
    minLength: [3, "Hotel name must be at least 3 characters"],
    maxLength: [100, "Hotel name must be less than 100 characters"],
  },

  selectedRoomType: {
    type: String,
    required: [true, "Selected room type is required."],
    // Add more specific validation rules for room type if needed
  },

  selectedServices: {
    wifi: {
      type: Boolean,
      default: false,
    },
    pool: {
      type: Boolean,
      default: false,
    },
    // Add more service fields with their respective types and default values
  },

  mainImage: {
    type: String,
    // You can define specific validation rules for image if needed
  },

  images: {
    type: [String], // Assuming an array of image URLs
    // You can define specific validation rules for images if needed
  },

  // Add other fields related to hotel details

  date: {
    type: Date,
    default: Date.now,
  },
});

const hotelDetails =
  mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);

export default hotelDetails;
