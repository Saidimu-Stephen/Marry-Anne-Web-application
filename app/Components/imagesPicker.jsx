/** @format */

import React, { useEffect, useState } from "react";

function ImageUpload({ selectedRoomName }) {
  const room_Name = selectedRoomName;

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [mainImage, setMainImage] = useState();
  const [minorImages, setMinorImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      console.log(room_Name);
      try {
        const response = await fetch("api/getImages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ room_Name }), // Remove duplicate room_Name
        });
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error appropriately, e.g., set error state
      }
    };

    if (room_Name) {
      fetchImages();
    }
  }, [room_Name]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setMainImage(file);
  //   }

  //   console.log(file);
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result.split(",")[1]; // Extract base64 data
        setMainImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleMultipleImageChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   setMinorImages(files);
  // };

  const handleMultipleImageChange = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result.split(",")[1]; // Extract base64 data
        setMinorImages((prevImages) => [...prevImages, base64Image]);
        console.log(minorImages);
      };
    });
  };

  // delete previewed unwanted images
  const handleDeleteImage = (index) => {
    const filteredImages = [...minorImages];
    filteredImages.splice(index, 1);
    setMinorImages(filteredImages);
  };

  // save  to databse function
  const handleSaveToDatabase = async () => {
    try {
      console.log(selectedRoomName, mainImage, minorImages);
      const res = await fetch("/api/saveImages", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          selectedRoomName,
          mainImage,
          minorImages,
        }),
        // });

        // JSON.stringify({ selectedRoomName, mainImage, minorImages }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.msg || "Failed to save images");
      }
      setMessage(responseData.msg);
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message || "Failed to save images");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className='container mx-auto px-4 md:flex md:flex-col md:items-center justify-center py-2  flex flex-col '>
      <h1 className='underline text-3xl font-semibold text-center'>
        Upload images
      </h1>

      {/* Main image picker */}
      <div className='flex items-center p-2 flex-col justify-center'>
        <h1 className='text-xl text-gray-500 font-semibold'>Main image</h1>
        <label htmlFor='mainImagePicker' className='cursor-pointer'>
          <div
            className='w-64 h-32 bg-gray-200 border-2 border-dashed rounded-lg
           hover:border-blue-500 transition duration-300 flex 
          justify-center'>
            {mainImage ? (
              <img
                // src={URL.createObjectURL(mainImage)}
                src={`data:image/jpeg;base64,${mainImage}`} // Assuming the image is in JPEG format, adjust accordingly
                alt='Selected'
                className='w-full h-full object-cover rounded-lg'
              />
            ) : (
              <>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-16 w-16 text-blue-500'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M16 7V5a5 5 0 00-5-5H9a5 5 0 00-5 5v2a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3v-6a3 3 0 00-3-3zM7 5a3 3 0 016 0v2H7V5z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='ml-2 text-gray-600'>Choose Image</span>
              </>
            )}
          </div>
        </label>
        <input
          type='file'
          id='mainImagePicker'
          className='hidden'
          accept='image/*'
          onChange={handleImageChange}
        />
      </div>
      {/* Multiple image picker */}
      <div className='mt-4 p-2 flex flex-col justify-center items-center'>
        <h1 className='text-xl font-semibold text-gray-600'>
          Other supporting images
        </h1>
        <div className='relative'>
          <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600'>
            Choose Images
          </button>
          <input
            type='file'
            accept='image/*'
            multiple
            onChange={handleMultipleImageChange}
            className='absolute inset-0 opacity-0 cursor-pointer'
          />
        </div>
        <div
          className='grid grid-cols-2 gap-4 mt-4'
          style={{ maxHeight: "200px", overflowY: "auto" }}>
          {minorImages.map((minorImages, index) => (
            <div key={index} className='relative'>
              <img
                // src={URL.createObjectURL(image)}
                src={`data:image/jpeg;base64,${minorImages}`}
                alt={`Preview ${index}`}
                className='w-full h-32 object-cover rounded-lg'
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className='absolute top-0 right-0 bg-red-400 hover:bg-red-700 text-white px-2 py-1 rounded-full'>
                delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center p-y2 bg-green-500 w-full'>
        <button
          onClick={handleSaveToDatabase}
          className='bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-300 absolute '>
          Save to Database
        </button>
      </div>

      {message && <div className='text-green-500'>{message}</div>}
      {error && <div className='text-red-500'>{error}</div>}
    </div>
  );
}

export default ImageUpload;
