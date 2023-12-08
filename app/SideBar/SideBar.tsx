/** @format */

import React from "react";
import Profile from "../Profile/Profile";
import menu from "../Utils/Menu";
import "app/style.css";

interface SideBarProps {
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
}

function SideBar({ activeItem, setActiveItem }: SideBarProps) {
  const handleItemClick = (item: string) => {
    // Update the activeItem state using setActiveItem
    setActiveItem(item);
  };

  return (
    // <div className="w-1/4 bg-slate-300 rounded-lg border-2 relative screen-h ">
    <div className="flex flex-col justify-between w-auto bg-slate-200 rounded-xl">
      {/* class component  */}
      <Profile />
      <div className="flex justify-center">
        <ul>
          {menu.map((menuItem) => (
            <li
              key={menuItem.id}
              className={`flex items-center py-2 px-4 relative hover:bg-gray-200 ${
                activeItem === menuItem.link ? "bg-gray-200" : ""
              }`}
              onClick={() => handleItemClick(menuItem.link)} // Call handleItemClick with the link value
              style={{ position: "relative", zIndex: "1" }} // Ensure elements have a stacking context
            >
              {menuItem.icon &&
                React.createElement(menuItem.icon, {
                  className: `mr-2 ${
                    activeItem === menuItem.link
                      ? "text-blue-500"
                      : "text-gray-800"
                  }`,
                })}
              <a
                href={menuItem.link}
                className={`${
                  activeItem === menuItem.link
                    ? "text-blue-500 font-bold"
                    : "text-gray-800"
                }`}
                style={{
                  position: "relative",
                  zIndex: "1",
                  color: activeItem === menuItem.link ? "#3B82F6" : "inherit",
                }}>
                {menuItem.title}
              </a>
              {activeItem === menuItem.link && (
                <span className="ml-auto bg-blue-500 w-2 h-2 rounded-full" />
              )}
              <div
                className="before-hover absolute inset-0 opacity-0 transition-opacity duration-300 bg-red-200 hover:opacity-100"
                style={{ zIndex: "-1" }}
              />
              <div
                className="after-hover absolute inset-0 opacity-0 transition-opacity duration-100 bg-green-300 hover:opacity-100"
                style={{ zIndex: "-1" }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button>Sign Out</button>
    </div>
    // </div>
  );
}

export default SideBar;
