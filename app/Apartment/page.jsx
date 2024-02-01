/** @format */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { set } from "mongoose";

function Apartment() {
  const [apartmentName, setApartmentName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!location || !apartmentName) {
      setError("Please fill in all the details");
      return;
    }

    if (location.length && apartmentName.length < 3) {
      setError("Invalid Hotel name or location");
      return;
    }

    // set post request to the database for saving the data
    try {
      const res = await fetch("/api/apartmentDetails", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          apartmentName,
          location,
        }),
      });
      console.log(apartmentName, location);
      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.msg || "Failed to submit data");
      }
      setMessage(responseData.msg);
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("Error:", error.message);
      setError("Failed to submit data");
      setTimeout(() => setError(""), 5000); // Set a general error message
      // Handle the error (e.g., display error message to the user)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-3/4 flex justify-center rounded shadow-md p-6">
        <div className="w-full">
          <div className=" flex  flex-col items-center">
            <h2 className="text-3xl  font-bold mb-4">Add New Apartment</h2>
            {error && (
              <div className="border p-2  bg-slate-200 border-red-500">
                <p className=" font-bold text-xl text-red-500">{error}</p>
              </div>
            )}{" "}
            {message && (
              <div className="border border-green-400  p-2 bg-green-300 fixed top-2">
                <p className="text-bold text-2xl ">{message}</p>
              </div>
            )}
          </div>
          <div className="border bg-green-50 p-4">
            <form
              className="flex flex-col  items-center"
              onSubmit={handleSubmit}>
              <div className="w-full">
                <label className="font-bold mb-2" htmlFor="apartmentName">
                  Apartment Name:
                </label>
                <input
                  className="border rounded-md p-2 mb-4"
                  type="text"
                  id="apartmentName"
                  placeholder="Apartment Name"
                  value={apartmentName}
                  onChange={(e) => setApartmentName(e.target.value)}
                />

                <label className="font-bold mb-2" htmlFor="location">
                  Location:
                </label>
                <input
                  className="border rounded-md p-2 mb-4"
                  type="text"
                  id="Location"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="flex flex-col  w-3/4 items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white border font-bold rounded px-4 py-2  hover:bg-blue-700 w-1/2
                  ">
                  Save
                </button>
                <Link
                  className="bg-red-500 fixed top-14 right-3 text-white px-4 py-2 mx-auto font-bold rounded hover:bg-red-700"
                  href="/Hosting">
                  Close
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apartment;
