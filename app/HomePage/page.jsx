/** @format */
"use client";
// ...

// Import useState from 'react'
import React, { useState } from "react";
import MainPage from "../Mainpage/MainPage";
import SideBar from "../SideBar/SideBar";

export default function Home() {
  // Set the initial state as an empty string
  const [activeItem, setActiveItem] = useState("");

  // Update the activeItem state with the provided item
  const handleSetActiveItem = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="flex gap-4 p-2 -100 h-screen">
      {/* Pass props to SideBar component */}
      <SideBar activeItem={activeItem} setActiveItem={handleSetActiveItem} />
      <MainPage />
    </div>
  );
}
