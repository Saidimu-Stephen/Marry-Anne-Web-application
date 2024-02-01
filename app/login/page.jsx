/** @format */
"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import InquiryComponent from "@/app/Components/InquiryComponentRegister";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  // New state for managing popup visibility
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();

    const apiUrl = "/api/login";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      const { msg, success, userData, token } = await response.json();

      setIsSuccess(success);
      setMessageContent(msg);
      setShowMessage(true);

      if (success) {
        // Redirect or perform action upon successful login
        // Reset fields if needed
        setUsername("");
        setPassword("");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false); // Hide the error popup after 5 seconds
          router.push("/");
        }, 5000); // Replace "/homepage" with your homepage route
        // console.log(msg, success, userData, token);
        // Assuming 'token' is received in the login response
        localStorage.setItem("token", token);
        console.log("local storage", localStorage);
      } else {
        // Handle login failure and display error message
        setIsSuccess(false); // Set isSuccess to false for error messages
        setMessageContent(msg[0]); // Assuming msg[0] contains the error message
        setShowMessage(true);
        setTimeout(() => {
          setShowPopup(false); // Hide the error popup after 5 seconds
        }, 5000);

        // Clear form fields or handle other error-specific scenarios
        setUsername("");
        setPassword("");
        // Handle specific error messages
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error scenarios, such as displaying an error message to the user
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    // This function will trigger Google's authentication flow
    // You need to initialize and call Google API methods to sign in
    // Example code using Google's API:
    // gapi.auth2.getAuthInstance().signIn().then(googleUser => {
    //   const profile = googleUser.getBasicProfile();
    //   console.log("Logged in as: " + profile.getName());
    //   console.log("Email: " + profile.getEmail());
    // });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="h-screen p-2">
        <form
          onSubmit={handleLogin}
          className="p-6 border bg-slate-100 rounded-md h-fill shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
            Login
          </h2>
          {/* // // 
          // */}
          {/* Updated code for displaying the popup message */}
          {showPopup && (
            <div
              className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-green-300 p-4 rounded-md shadow-lg z-50`}>
              <div
                className={`text-${
                  isSuccess ? "green" : "red"
                }-500 text-center`}>
                {messageContent}
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="block mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                Close
              </button>
            </div>
          )}
          {/* End of updated code for displaying the popup message */}

          <div className="mb-4">
            <label htmlFor="Username" className="block mb-1">
              Username:
            </label>
            <input
              type="text"
              id="userName"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="pb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
              Login
            </button>
          </div>

          <div>
            <InquiryComponent />
          </div>

          <div className="border-2 border-black"></div>
          <div>
            <button
              onClick={handleGoogleLogin}
              className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out flex justify-center items-center">
              <FontAwesomeIcon
                icon={faGoogle}
                className="mr-2"
                style={{ fontSize: "1rem" }}
              />
              Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
