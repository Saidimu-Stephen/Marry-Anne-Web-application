/** @format */
"use client";

import { useState, useRef, useEffect } from "react";

export default function HotelDetailsForm() {
  // Use states
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
      !roomServices ||
      !mainImage ||
      images.length === 0
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

  return (
    <div className="flex justify-center items-center flex-grow min-h-screen p-2 border shadow-2xl">
      <div className="flex flex-col gap-4 p-5 bg-white w-3/4">
        <h1 className="text-2xl font-bold text-center text-blue-600 py-2">
          Hotel Details Form
        </h1>
        {/* form  */}
        <form
          onSubmit={handleSubmit}
          className="py-4 mt-4 border-2 flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
          {/* Hotel Basic Information */}
          <div className="">
            <label
              className="text-2xl font-bold  text-gray-800"
              htmlFor="hotelName">
              Hotel Name
            </label>
            <input
              onChange={(e) => setHotelName(e.target.value)}
              value={hotelName}
              type="text"
              id="hotelName"
              placeholder="Enter hotel name"
            />{" "}
            {/* Other fields for hotel address, contact details, check-in/out times */}
          </div>
          {/* Accommodation Details */}
          <div>
            <label
              className=" text-2xl font-bold  text-gray-800"
              htmlFor="roomTypes">
              Room Types Available
            </label>
            <select
              /* Add necessary state and logic to handle room types */
              id="roomTypes"
              value={selectedRoomType} // Ensure you have state for selectedRoomType
              onChange={(e) => setSelectedRoomType(e.target.value)} // Update state on change
            >
              <option value="">Select room type</option>
              <option value="single">Single Room</option>
              <option value="double">Double Room</option>
              <option value="twin">Twin Room</option>
              <option value="suite">Suite</option>
              <option value="deluxe">Deluxe Room</option>
              {/* Add more <option> elements as needed */}
            </select>
            {/* Additional input fields for room descriptions, images, room rates, etc. */}
          </div>
          {/* Services and Amenities */}

          <div>
            <label
              className="text-2xl font-bold text-gray-800"
              htmlFor="services">
              Services Available
            </label>
            <div className="bg-slate-100 p-2 flex flex-wrap gap-2">
              <button
                className={`${
                  wifiSelected
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } px-4 py-2 rounded focus:outline-none`}
                onClick={handleWifiSelection}>
                Wi-Fi
              </button>
              <button
                className={`${
                  poolSelected
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } px-4 py-2 rounded focus:outline-none`}
                onClick={handlePoolSelection}>
                Swimming Pool
              </button>
              <button
                className={`${
                  gymSelected
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } px-4 py-2 rounded focus:outline-none`}
                onClick={handleGymSelection}>
                Gym
              </button>
              {/* Add more buttons for other services */}
            </div>
          </div>
          {/* Local Attractions and Information */}
          <div>
            <label
              className="text-2xl font-bold  text-gray-800"
              htmlFor="attractions">
              Nearby Attractions
            </label>
            <input
              /* Add necessary state and logic to handle nearby attractions */
              type="text"
              id="attractions"
              placeholder="Enter nearby attractions"
            />
            {/* Additional input fields for directions, transportation, etc. */}
          </div>
          {/* Main Image picker  */}
          <div class="text-gray-800">
            <h1 class="text-2xl font-bold mb-4">Main Image</h1>
            <div class="flex items-center gap-4">
              <label
                for="mainImageUpload"
                class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="mainImageUpload"
                onChange={handleImageChange}
                ref={fileInputRef}
                class="hidden"
              />
              {mainImage && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img
                      src={mainImage}
                      alt="Main"
                      className="max-w-full h-auto"
                      style={{ maxWidth: "300px" }} // Adjust the max width as needed
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 z-10 border-2 border-red-500 rounded-md bg-red-200 px-3 py-1 hover:bg-red-300 hover:border-red-600 transition duration-300 ease-in-out">
                      Remove Image
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Minor image picker  */}
          <div>
            <div>
              <h1 class="text-3xl font-bold mb-6 text-gray-900">
                Additional Images
              </h1>

              <div class="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <div key={index} class="mb-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleMinorImageChange(e, index)}
                      class="hidden"
                      id={`fileInput-${index}`}
                    />
                    <label
                      for={`fileInput-${index}`}
                      class="relative cursor-pointer block w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                      {image && (
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          class="object-contain w-full h-full"
                        />
                      )}
                      {!image && (
                        <span class="absolute inset-0 flex items-center justify-center text-gray-600 text-lg">
                          Upload Image
                        </span>
                      )}
                    </label>
                    {image && (
                      <button
                        type="button"
                        className="block mt-2 px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                        onClick={() => handleMinorRemoveImage(index)}>
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={handleAddImage}
                className="block mt-6 px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                Add Image
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-auto"
              type="submit">
              Save Hotel Details
            </button>
          </div>
        </form>

        {/* end of form  */}
        <div className="bg-slate-100 flex flex-col">
          {/* Display error or success messages */}
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
