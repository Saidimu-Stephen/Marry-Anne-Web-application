/** @format */

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ImageUpload from "@/app/Components/imagesPicker";

function Page(props) {
  const { searchParams } = props;
  const { apartmentName } = searchParams;
  const { location } = searchParams;
  const Apartment_Name = apartmentName;

  const [rooms, setRooms] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [error, setError] = useState(null);

  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);
  const [selectedRoomName, setSelectedRoomName] = useState(null);

  useEffect(() => {
    // Your fetch request
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/getRoomDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Apartment_Name: apartmentName }), // Sending apartmentName in the request body
        });
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        console.log(data);
        setRooms(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch rooms");
      }
    };

    if (apartmentName) {
      // Only fetch when apartmentName is available
      fetchRooms();
    }
  }, [apartmentName]); // Depend on apartmentName to trigger the fetch

  const handleRoomClick = (roomId) => {
    setSelectedRoomId(roomId);

    const selectedRoom = rooms.find((room) => room._id === roomId);

    // Set the selected room details
    setSelectedRoomDetails(selectedRoom);

    console.log("selected room", selectedRoom);
    setSelectedRoomName(selectedRoom.roomName);
  };
  return (
    <div
      // style={{ maxHeight: "screen" }}
      className='md:flex md:justify-center flex flex-col'>
      <div className='flex-col w-full mx-aut flex bg-gradient-to-r from-green-400 to-blue-500'>
        <h1 className='text-4xl md:text-6xl font-semibold text-center font-serif capitalize tracking-wider text-white py-2 md:pt-2 px-4 md:px-6 shadow-xl'>
          {apartmentName}
          <p className='text-base md:text-xl capitalize opacity-100 tracking-normal'>
            {location}
          </p>
        </h1>
      </div>

      <div className='flex flex-col md:flex-row h-auto md:h-screen px-4 w-full'>
        <div className='bg-gradient-to-br from-purple-100 to-indigo-300 border-4 h-auto md:h-screen border-purple-600 p-6 w-full md:w-1/4 flex flex-col items-center rounded-lg shadow-lg mb-4 md:mb-0'>
          <h1 className='text-xl md:text-3xl pb-2 font-bold underline text-center text-gray-800'>
            Available rooms
          </h1>

          <div className='flex flex-col justify-center p-4 w-full bg-gradient-to-r from-green-400 to-green-600 border pt-24 border-green-700 rounded-lg shadow-lg overflow-y-auto space-y-4'>
            {rooms.map((room) => (
              <div
                key={room._id}
                className='mr-4 ml-4 p-4 border border-gray-300 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-between bg-slate-200'
                onClick={() => handleRoomClick(room._id)} // <-- Add click event handler
              >
                <div className='text-xl font-semibold'>{room.roomName}</div>
              </div>
            ))}
            {error && <p className='text-red-500'>{error}</p>}
          </div>

          <div className='p-4'>
            <Link
              href={{
                pathname: "/roomsRegistration",
                query: { nameOfApartment: apartmentName },
              }}
              className='bg-blue-400 hover:bg-blue-700 font-serif text-white text-xl py-2 rounded-md px-2'>
              Add Rooms
            </Link>
          </div>
        </div>
        {/* left div  */}
        <div className='bg-green-300 ml-2 border-4 items-center flex flex-col md:flex-row border-green-500 w-full md:w-3/4 p-6 rounded-md shadow-md'>
          <div className='w-full md:w-1/2 mb-4 md:mb-0 md:flex md:flex-col'>
            {selectedRoomDetails && (
              <div className='bg-blue-100 border-blue-300 h-full rounded-md shadow-md overflow-y-auto'>
                <h1 className='text-xl md:text-3xl pb-2 font-bold underline text-center text-gray-800'>
                  {selectedRoomDetails.roomName}
                </h1>
                {/* Render all room details */}
                {Object.entries(selectedRoomDetails)
                  .filter(([key]) => key !== "_id" && key !== "__v")
                  .map(([key, value]) => (
                    <div key={key} className='p-2'>
                      <div className='flex text-gray-700 font-semibold'>
                        {key}
                      </div>
                      <div className='text-gray-900 bg-gray-300 rounded-md px-3 py-1 border border-gray-400'>
                        {value}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className='bg-blue-100 ml-2 border-4 flex flex-col h-full border-blue-300 items-center md:w-1/2 p-6 rounded-md shadow-md'>
            <ImageUpload selectedRoomName={selectedRoomName} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
