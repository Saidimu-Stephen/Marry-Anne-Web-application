/** @format */

// ...

"use client";

import { useState, Dispatch, SetStateAction } from "react"; // Import Dispatch and SetStateAction
import SideBar from "./SideBar/SideBar";
import MainPage from "./Mainpage/MainPage";

export default function Home() {
  const [activeItem, setActiveItem] = useState<string>(""); // Set the initial state as string
  const handleSetActiveItem: Dispatch<SetStateAction<string>> = (
    item: string | ((prevState: string) => string)
  ) => {
    // Update the activeItem state with the provided item
    setActiveItem(item);
  };

  return (
    <div className="flex gap-4 p-2 -100 h-screen">
      <SideBar activeItem={activeItem} setActiveItem={handleSetActiveItem} />
      <MainPage />
    </div>
  );
}
