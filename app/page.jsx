/** @format */
import React from "react";

// Dummy data for room listings
const roomData = [
  {
    id: 1,
    title: "Luxury Suite",
    description: "A luxurious suite with a stunning view.",
    price: "$200/night",
    image: "https://via.placeholder.com/300x200", // Placeholder image URL
  },
  {
    id: 2,
    title: "Cozy Room",
    description: "A comfortable and cozy room for your stay.",
    price: "$100/night",
    image: "https://via.placeholder.com/300x200", // Placeholder image URL
  },
  // Add more rooms as needed
];

function Page() {
  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-4">Available Rooms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roomData.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={room.image}
              alt={room.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{room.title}</h2>
              <p className="text-sm mb-2">{room.description}</p>
              <p className="text-gray-600">{room.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
