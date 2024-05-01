/**
 * UserProfile Component
 *
 * This component displays the user profile information and provides functionality
 * to interact with the user profile, such as logging out and closing the profile popup.
 * It also receives a function as a prop to handle profile click events.
 *
 * @format
 */

import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import React, { useState, useRef, useEffect } from "react";
import { VscAccount } from "react-icons/vsc";

// Define the structure of user data
interface UserData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Define props for the UserProfile component
interface UserProfileProps {
  onProfileClick: () => void; // Function to handle profile click events
}

// Define the structure of user data main
interface UserDataMain {
  userData: UserData;
  expiry: number;
}

/**
 * UserProfile function
 *
 * @param {UserProfileProps} onProfileClick Function to handle profile click events.
 * @returns {JSX.Element} The rendered UserProfile component.
 */
function UserProfile({ onProfileClick }: UserProfileProps) {
  const [issOpen, setIsOpen] = useState<boolean>(false);
  const [userDataMain, setUserData] = useState<UserDataMain | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false); // Change Boolean to boolean

  const router = useRouter();

  const popupRef = useRef<HTMLDivElement>(null);

  /**
   * toggleDropdown function
   *
   * Toggles the user profile dropdown and calls the onProfileClick function.
   */
  const toggleDropdown = () => {
    if (loggedIn) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
      onProfileClick();
    }
  };

  // Effect hook to check if user data and token exist in local storage
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("token");

    if (storedData && storedToken) {
      setUserData(JSON.parse(storedData));
      setToken(storedToken);
      setLoggedIn(true); // Set loggedIn to true if user data and token exist
    } else {
      setLoggedIn(false);
      setIsOpen(false);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      router.push("/login");
    }
  }, []);

  // Effect hook to check if the user is logged in
  useEffect(() => {
    if (loggedIn) {
      loadingStatus();
    } else {
      setIsLoading(false); // Set isLoading to false if not logged in
    }
  }, [loggedIn]);

  // Effect hook to update user data when userDataMain changes
  useEffect(() => {
    if (userDataMain) {
      setUsername(userDataMain.userData.username);
      setEmail(userDataMain.userData.email);
      setFirstName(userDataMain.userData.firstName);
      setLastName(userDataMain.userData.lastName);
    }
  }, [userDataMain]);

  /**
   * loadingStatus function
   *
   * Checks if all user data is loaded and updates isLoading state accordingly.
   * Redirects to login page if user data is incomplete.
   */
  const loadingStatus = () => {
    if (username && email && firstName && lastName) {
      setIsLoading(false);
    } else {
      router.push("/login");
    }
  };

  /**
   * closeProfilePopUp function
   *
   * Closes the user profile popup.
   */
  const closeProfilePopUp = () => {
    setIsOpen(false);
  };

  /**
   * logOut function
   *
   * Logs out the user by removing token and user data from local storage
   * and redirects to the login page.
   */
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setLoggedIn(false);
    setUserData(null);
    setUsername("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setIsOpen(false);
    router.push("/login");
  };

  return (
    <div className='user-profile'>
      {isLoading ? (
        <p>Loading user data...</p>
      ) : (
        <div className='user-profile'>
          <div className='profile-image flex flex-col items-center'>
            <div>
              <VscAccount
                onClick={toggleDropdown}
                className='clickable hover:text-blue-600 text-gray-800 text-3xl mb-4 cursor-pointer'
              />
            </div>

            {issOpen && (
              <div
                className='fixed z-50 top-12 right-6 bg-white shadow-lg rounded-md p-6'
                ref={popupRef}>
                <div className='flex justify-center'>
                  <VscAccount
                    onClick={toggleDropdown}
                    className='clickable hover:text-blue-600 text-gray-800 text-4xl mb-4 cursor-pointer'
                  />
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <div className='flex justify-center py-2'>
                    <p className='text-xl text-gray-600 font-semibold mr-2'>
                      {firstName}
                    </p>
                    <p className='text-xl text-gray-600 font-semibold'>
                      {lastName}
                    </p>
                  </div>
                  <p className='text-lg font-medium text-gray-600 mb-4'>
                    {email}
                  </p>
                  <div className='flex justify-center'>
                    <button
                      onClick={logOut}
                      className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>
                      Log Out
                    </button>
                  </div>
                  <div className='flex pt-4 justify-center'>
                    <button
                      onClick={closeProfilePopUp}
                      className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75'>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default UserProfile;
