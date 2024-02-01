/** @format */

"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
// import { useRouter } from 'next/router';


import { useEffect, useState } from "react";

function RoomsRegistration(props) {
  const router = useRouter();
  const { searchParams } = props;
  const { nameOfApartment } = searchParams;
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [name, setName] = useState("")
  const [isPopupOpen, setIsPopupOpen]= useState(false)
  // State to store the submission message



  // const [name, setName]= useState("")


  const [roomData, setRoomData] = useState("");

const [formData, setFormData] = useState({
  formData: {

    roomName: "",
    roomType: "",
    numberOfGuests: "",
    numberOfBeds: "",
    roomDescription: "",
    price: "",
    // Add more fields as needed
  },
});


// ... (previous code remains unchanged)

const handleChange = (e) => {
  const { name, value } = e.target;

   if (name === 'roomName') {
    // If the changed input is 'roomName', update the 'name' state
    setName(value);
  }
  setFormData((prevFormData) => ({
    ...prevFormData,
    formData: {
      ...prevFormData.formData,
      [name]: value,
    },

  
  }));

     
};

  const handleSubmit = async (e) => {
      setIsPopupOpen(true)
 
console.log(name)
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      
      // Check if any field is empty
      for (const field in formData) {
        if (formData[field] === "") {
          alert("Please fill in all fields before submitting.");
          setIsSubmitting(false);
          return;
        }
      }


      const updatedFormData = {
            ...formData.formData,
            nameOfApartment: nameOfApartment,
        };

   const res = await fetch("api/roomDescriptions", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
     body: JSON.stringify({updatedFormData}),

   });
      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.msg || "Failed to submit data");
      }

      setSubmitMessage(responseData.msg || "Form submitted successfully!");
      setRoomData(responseData.data);

      if (responseData.msg == "Room created successfully") {
           setFormData({
                formData: {
                    roomName: "",
                    roomType: "",
                    numberOfGuests: "",
                    numberOfBeds: "",
                    roomDescription: "",
                    price: "",
                    // Add more fields as needed
                },
           });
        
        setError("");
      
     
      }
    } catch (error) {
        console.error("Error:", error.message);
        setError(error.message); // Capture the error message
        setTimeout(() => setError(""), 5000);
        // Handle the error (e.g., display error message to the user)
    } finally {
        setIsSubmitting(false);
    }
  };
  
   const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the pop-up
   };
  
   const handleGoBack = () => {
    router.back(); // Navigate back to the previous page
  };

  
  return (
    <div className="h- bg-gradient-to-r from-purple-300 to-indigo-100 shadow-md text-center overflow-auto">
      {/* <!-- Your content goes here --> */}
      <h1 className="text-4xl font-bold  capitalize tracking-wide font-serif text-center text-gray-900 my-6">
        {nameOfApartment} Apartment
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-gray-100 p-6 rounded-md shadow-md">
        {/*  */}

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Room Description
        </h1>
        {/*  */}
        {/* Display submission message if available */}


        {/* Pop-up */}
       {/* Main Pop-up */}
{isPopupOpen && (
  <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg border-4 border-green-600 p-8">
    <div className="gap-4">
      <h1 className="text-green-600 font-bold text-4xl capitalize font-serif">
        {submitMessage}
      </h1>
      {/* Additional content inside the main pop-up */}
      {submitMessage && (
        <div className="text-3xl mt-4">
          <div className="bg-slate-200 rounded-lg text-black shadow-md p-6 mt-4">
            <h2 className="text-3xl underline font-semibold mb-4">Room Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <p className="text-lg font-semibold">Room Name:</p>
                <p className="text-gray-600">{roomData?.roomName}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-lg font-semibold">Room Type:</p>
                <p className="text-gray-600">{roomData?.roomType}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-lg font-semibold">Number of Guests:</p>
                <p className="text-gray-600">{roomData?.numberOfGuests}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-lg font-semibold">Room Description:</p>
                <p className="text-gray-600">{roomData?.roomDescription}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-lg font-semibold">Room Price:</p>
                <p className="text-gray-600">{roomData?.price}</p>
              </div>
              {/* Add more properties as needed */}
            </div>
          </div>
          <div className="p-4 mt-4">
            <button onClick={handleClosePopup} className="py-2 px-2 rounded-md bg-red-400 hover:bg-red-700">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
)}


        {/* Display error message if available */}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        {/*  */}
         {/* Add the read-only label for the apartment name */}
      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2">
          Apartment Name
        </label>
          <div className="w-full border-2 flex border-gray-300 p-2 rounded-md focus:outline-none">
            
            <p>
            {nameOfApartment}
            
            </p>
          
        </div>
        </div>
        


        <div className="mb-4">
          <label
            htmlFor="roomName"
            className="block text-gray-700 font-semibold mb-2">
            Room Title
          </label>
          <input
            type="text"
            id="roomName"
            name="roomName"
            value={formData.roomName}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter room name or number"
          />
        </div>
        {/*  */}
        <div className="mb-4">
          <label
            htmlFor="roomType"
            className="block text-gray-700 font-semibold mb-2">
            Type
          </label>
          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500">
            <option value="">Select room type</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
            <option value="deluxe">Deluxe</option>
            <option value="apartment">Apartment</option>
            <option value="penthouse">Penthouse</option>
          </select>
        </div>

        {/*  */}
        {/* < class="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6"> */}
        <div className="mb-4">
          <label
            htmlFor="numberOfGuests"
            className="block text-gray-700 font-semibold mb-2">
            Number of Guests
          </label>
          <input
            type="number"
            id="numberOfGuests"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter number of guests"></input>
        </div>
        <div className="mb-4">
          <label
            htmlFor="numberOfBeds"
            className="block text-gray-700 font-semibold mb-2">
            Number of Beds
          </label>
          <input
            type="number"
            id="numberOfBeds"
            name="numberOfBeds"
            value={formData.numberOfBeds}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter number of beds"></input>
        </div>

        {/*  */}

        <div className="mb-4">
          <label
            htmlFor="roomDescription"
            className="block text-gray-700 font-semibold mb-2">
            Room Description
          </label>
          <textarea
            id="roomDescription"
            name="roomDescription"
            value={formData.roomDescription}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter room description"></textarea>
        </div>
        {/*  */}

        {/*  */}

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter price"></input>
        </div>


        <div className="p-2">
          <button
            type="submit"
             
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">
          Create room
        </button>

          <button
            type="button"
             onClick={handleGoBack}
            className="bg-red-500 hover:bg-red-700  text-white font-semibold py-2 rounded-md"> Back</button>
        </div>
      </form>
    </div>
  );
}

export default RoomsRegistration;
