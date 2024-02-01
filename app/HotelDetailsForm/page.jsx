/** @format */
"use client";

import React, { useState, useRef, useEffect } from "react";

export default function HotelDetailsForm() {
  const [hotelName, setHotelName] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const [wifiSelected, setWifiSelected] = useState(false);
  const [poolSelected, setPoolSelected] = useState(false);
  const [gymSelected, setGymSelected] = useState(false);
  const [roomServices, setRoomServices] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const updatedRoomServices = [];

    if (wifiSelected) {
      updatedRoomServices.push("wifi");
    }

    if (gymSelected) {
      updatedRoomServices.push("Gym");
    }

    if (poolSelected) {
      updatedRoomServices.push("pool");
    }

    setRoomServices(updatedRoomServices);
  }, [wifiSelected, gymSelected, poolSelected]);

  const handleWifiSelection = () => {
    setWifiSelected(!wifiSelected);
  };

  const handlePoolSelection = () => {
    setPoolSelected(!poolSelected);
  };

  const handleGymSelection = () => {
    setGymSelected(!gymSelected);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMainImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setMainImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !hotelName ||
      !selectedRoomType ||
      !description ||
      !roomServices.length ||
      !mainImage ||
      !images.length
    ) {
      setError(
        "Please fill in all fields and select at least one service and images."
      );
      return;
    }

    if (hotelName.length < 3) {
      setError("Hotel name should be at least 3 characters.");
      return;
    }

    try {
      const res = await fetch("api/hotelDetails", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          hotelName,
          selectedRoomType,
          description,
          roomServices,
          mainImage,
          images,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.msg || "Failed to submit data");
      }

      setSuccess(true);
      setError("");
      setHotelName("");
      setSelectedRoomType("");
      setMainImage(null);
      setImages([]);
    } catch (error) {
      setError(error.message || "Unable to submit form. Please try again.");
      setSuccess(false);

      console.error("Error:", error.message);
    }
  };

  const handleMinorImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedImages = [...images];
        updatedImages[index] = reader.result;
        setImages(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    setError([]);
    setImages([...images, ""]);
  };

  const handleMinorRemoveImage = (index) => {
    setError([]);
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div className="flex justify-center items-center flex-grow min-h-screen p-2 border shadow-2xl">
      <div className="flex flex-col gap-4 p-5 bg-white w-3/4">
        <h1 className="text-2xl font-bold text-center text-blue-600 py-2">
          Hotel Details Form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="py-4 mt-4 border-2 flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
          {/* ... rest of the form fields */}
        </form>

        <div className="bg-slate-100 flex flex-col">
          {error && error.length > 0 && Array.isArray(error) && (
            <div className="text-red-600 px-5 py-2">
              {error.map((errorMsg, index) => (
                <div key={index}>{errorMsg}</div>
              ))}
            </div>
          )}
          {success && (
            <div className="text-green-800 px-5 py-2">
              Hotel details submitted successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
