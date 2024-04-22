/** @format */

import React, { useState, useRef, useEffect } from "react";
import { VscAccount } from "react-icons/vsc";

// Define the structure of user data
interface UserData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface UserDataMain {
  userData: UserData;
  expiry: number;
}

function UserProfile() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [userDataMain, setUserData] = useState<UserDataMain | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string>("");

  const popupRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  const handleClickOutside = (event: MouseEvent) => {
    // if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
    //   setIsOpen(false);
    // }
  };

  useEffect(() => {
    const handleClickInsidePopup = (event: MouseEvent) => {
      event.stopPropagation(); // Prevent event propagation
    };

    if (popupRef.current) {
      popupRef.current.addEventListener("click", handleClickInsidePopup);
    }

    return () => {
      if (popupRef.current) {
        popupRef.current.removeEventListener("click", handleClickInsidePopup);
      }
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (userDataMain) {
      setUsername(userDataMain.userData.username);
      setEmail(userDataMain.userData.email);
      setFirstName(userDataMain.userData.firstName);
      setLastName(userDataMain.userData.lastName);
    }

    setIsLoading(false);
  }, [userDataMain]);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("token");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }

    if (storedToken) {
      setToken(storedToken);
    }

    setIsLoading(false); // Data retrieval complete
  }, []);

  const closeProfilePopUp = () => {
    setIsOpen(false); // Set the state variable to close the popup
  };

  return (
    <div className='   user-profile'>
      {isLoading ? (
        <p>Loading user data...</p>
      ) : (
        <div className='user-profile'>
          {/* Profile image (clickable VscAccount icon) */}
          <div className='profile-image flex flex-col items-center '>
            {!isOpen && (
              <div>
                {/* TODO:
                
                1. enable adding of profile image
                2. toogle between user profile if there is image in the databse*/}
                <VscAccount
                  onClick={toggleDropdown}
                  className='clickable hover:  text-2xl mb-2 cursor-pointer'
                />
              </div>
            )}

            {/* Popup menu (conditional rendering) */}
            {isOpen && (
              <div
                className='fixed z-50 first:top-1 right-0 bg-gray-200 shadow-md rounded-md p-4'
                ref={popupRef}
                style={{
                  border: "1px solid black",
                  // backgroundColor: "lightgray",
                }}>
                <div className='flex justify-center'>
                  {" "}
                  <VscAccount
                    onClick={toggleDropdown}
                    className='clickable hover: text-3xl mb-2 cursor-pointer'
                  />
                </div>
                <div
                  className='flex
               flex-col justify-center'>
                  <div className='flex justify-center py-1'>
                    <p className=' text-2xl font-extralight  mr-2'>
                      {firstName}{" "}
                    </p>
                    <p className=' text-2xl  font-extralight '>{lastName}</p>
                  </div>
                  <p className='text-xl font-semibold '>{email}</p>

                  <div className='flex pt-2 justify-center'>
                    <button
                      onClick={closeProfilePopUp}
                      className='bg-red-300 p-1 hover:bg-red-600 rounded-md'>
                      Close
                    </button>
                  </div>
                </div>

                {/* Add more user information here */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
