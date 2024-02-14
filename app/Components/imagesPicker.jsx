/** @format */

import React, { useEffect, useState } from "react";

function ImageUpload({ selectedRoomName }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [mainImage, setMainImage] = useState();
  const [minorImages, setMinorImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await fetch("/api/getImages", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ selectedRoomName }),
  //       });
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch images");
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setError("Failed to fetch images");
  //     }
  //   };

  //   if (selectedRoomName) {
  //     fetchImages();
  //   }
  // }, [selectedRoomName]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 200 * 1024) {
        try {
          const compressedImage = await compressImage(file);
          const compressedImageData = await readFileAsDataURL(compressedImage);
          setMainImage(compressedImageData);
          setError("");
        } catch (error) {
          console.error("Error compressing image:", error);
          setError("Error compressing main image");
        }
      } else {
        setMainImage(file);
        setError("");
      }
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const maxWidth = 800;
          const maxHeight = 800;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            "image/jpeg",
            0.5
          );
        };
        img.onerror = (error) => {
          reject(error);
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleMultipleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    const compressedImages = await Promise.all(files.map(compressImage));
    const base64Images = await Promise.all(
      compressedImages.map(readFileAsDataURL)
    );
    setMinorImages(base64Images);
  };

  const handleDeleteImage = (index) => {
    const filteredImages = [...minorImages];
    filteredImages.splice(index, 1);
    setMinorImages(filteredImages);
  };

  const handleSaveToDatabase = async () => {
    try {
      setLoading(true);
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
      });
      if (!res.ok) {
        throw new Error("Failed to save images");
      }
      const responseData = await res.json();
      setMessages([responseData.message]);
      setTimeout(() => setMessages([]), 5000); // Clear messages after 5 seconds
    } catch (error) {
      console.error("Error:", error.message);
      setMessages(["Failed to save images"]);
      setTimeout(() => setMessages([]), 5000); // Clear messages after 5 seconds
    } finally {
      setLoading(false);
    }
  };

   return (
     <div className='container mx-auto px-4 md:flex md:flex-col md:items-center justify-center py-2 flex flex-col'>
       <h1 className='underline text-3xl font-semibold text-center'>
         Upload images
       </h1>

       {/* Main image picker */}
       <div className='flex items-center p-2 flex-col justify-center'>
         <h1 className='text-xl text-gray-500 font-semibold'>Main image</h1>
         <label htmlFor='mainImagePicker' className='cursor-pointer'>
           <div className='w-64 h-32 bg-gray-200 border-2 border-dashed rounded-lg hover:border-blue-500 transition duration-300 flex justify-center'>
             {mainImage ? (
               <img
                 src={
                   mainImage && mainImage.startsWith("data:")
                     ? mainImage
                     : URL.createObjectURL(mainImage)
                 }
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
           {minorImages.map((imageData, index) => (
             <div key={index} className='relative'>
               <img
                 src={imageData} // Use imageData directly if it's already base64 encoded
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

       <div className='flex justify-center p-y2 bg-green-500 w-full relative'>
         <button
           onClick={handleSaveToDatabase}
           disabled={loading} // Disable button while loading
           className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-300 absolute ${
             loading ? "opacity-50 cursor-not-allowed" : "" // Apply styles for loading state
           }`}>
           Save to Database
         </button>
         {loading && (
           <div className='absolute p-2 inset-0 flex items-center justify-center bg-black bg-opacity-50 text-green-500 text-xl'>
             Loading...
           </div>
         )}
       </div>
       {/* Pop-up for displaying messages */}
       {messages.length > 0 && (
         <div className='fixed inset-0 flex items-center justify-center'>
           <div className='bg-green-500 text-black px-4 py-2 rounded'>
             {messages.map((message, index) => (
               <div key={index}>{message}</div>
             ))}
           </div>
         </div>
       )}
       {error && (
         <div className='fixed inset-0 flex items-center justify-center'>
           <div className='bg-red-500 text-white px-4 py-2 rounded'>
             {error}
           </div>
         </div>
       )}
       {/* 
      {message && <div className='text-green-500'>{message}</div>}
      {error && <div className='text-red-500'>{error}</div>} */}
     </div>
   );
}

export default ImageUpload;
