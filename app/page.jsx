/** @format */
"use client";
import React, { useEffect, useState } from "react";

function Page() {
  const [availableApartments, setAvailableApartments] = useState([]);
  const [availabeleRooms, setAvailabelRooms] = useState([]);
  const [errors, setErrors] = useState("");
  // use effe functions to get all the available apartment and there lcocation
  useEffect(() => {
    fetch("/api/getAvailableApartments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch available apartments");
        }
        return response.json();
      })
      .then((data) => {
        setAvailableApartments(data);
      })
      .catch((error) => {
        setErrors(error.message);
      });
  }, []);

  // Use effect function to get all the availabele rooms in the apartments

  useEffect(() => {
    fetch("api/getAvailableRooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch available rooms");
        }
        return response.json();
      })
      .then((data) => {
        setAvailabelRooms(data);
      })
      .catch((error) => {
        setErrors(error.message);
      });
  }, []);

  useEffect(() => {
    console.log(availabeleRooms);
  }, []);
  return (
    <div className='container mx-auto mt-4'>
      <h1 className='text-3xl font-bold mb-4'>Available Rooms</h1>
      {availableApartments.map((apartment, index) => (
        <div key={index} className='mb-8'>
          <div className='bg-white p-4 rounded-lg shadow w-full'>
            <h2 className='text-xl font-semibold'>{apartment.apartmentName}</h2>
            <p className='text-gray-600'>{apartment.location}</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
              {/* Filter rooms based on apartment name */}
              {availabeleRooms
                .filter(
                  (room) => room.nameOfApartment === apartment.apartmentName
                )
                .map((room, roomIndex) => (
                  <div
                    key={roomIndex}
                    className='bg-white p-4 rounded-lg shadow w-full'>
                    <h3 className='text-lg font-semibold'>{room.roomName}</h3>
                    <p className='text-gray-600'>Type: {room.roomType}</p>
                    <p className='text-gray-600'>
                      Number of Guests: {room.numberOfGuests}
                    </p>
                    <p className='text-gray-600'>
                      Number of Beds: {room.numberOfBeds}
                    </p>
                    <p className='text-gray-600'>
                      Description: {room.roomDescription}
                    </p>
                    <p className='text-gray-600'>Price: {room.price}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
      {/* Display errors if any */}
      {errors && <div className='text-red-500 mt-4'>Error: {errors}</div>}
    </div>
  );
}

export default Page;
