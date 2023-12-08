/** @format */
"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Load Google API script
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic for email/password here
    console.log("Username:", userName);
    console.log("Password:", password);
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
    <div className="flex justify-center  items-center ">
      <div className="h-screen p-2">
        {" "}
        <form
          onSubmit={handleLogin}
          className="p-6 border  bg-slate-100 rounded-md h-fill shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
            Login
          </h2>

          <div className="mb-4 ">
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
            {" "}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
              Login
            </button>
          </div>

          {/* continue with google  */}
          <div className="border-2 border-black "></div>
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
