/** @format */
"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleRegister from "@/app/Components/GoogleRegister";
import { useRef } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

import InquiryComponent from "../Components/InquiryComponentLogin";
/**
 * ContactForm component to handle user contact information.
 * @returns {JSX.Element} Contact form JSX
 */

export default function ContactForm() {
  // State variables to manage form inputs and error/success handling
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const genderRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false); // Track success status

  const router = useRouter();

  /**
   * Handles form submission.
   * Performs validation and sends data to the server.
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsToValidate = [
      {
        field: firstName,
        ref: firstNameRef,
        message: "First name is required.",
      },
      { field: lastName, ref: lastNameRef, message: "Last name is required." },
      { field: username, ref: usernameRef, message: "Username is required." },
      { field: email, ref: emailRef, message: "Email is required." },
      {
        field: phoneNumber,
        ref: phoneNumberRef,
        message: "Phone number is required.",
      },
      { field: gender, ref: genderRef, message: "Gender is required." },
      { field: password, ref: passwordRef, message: "Password is required." },
      // Add more fields to validate here if needed
    ];

    const emptyFields = fieldsToValidate.filter(
      ({ field }) => field.trim() === ""
    );

    // Validates if passwords match
    if (password !== confirmPassword) {
      setError(["Passwords do not match"]);
      setShowMessage(true); // Show error message
      return;
    }

    // Simulate sending form data to an API
    const res = await fetch("api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        gender,
        password,
      }),
    });

    // Handle API response
    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);

    // Set success status for styling
    setIsSuccess(success);

    setMessageContent(msg);

    // Display the pop-up if there are messages

    if (msg && msg.length > 0) {
      setMessageContent(msg); // Set error or success messages
      setShowMessage(true); // Show the pop-up with messages
    } else {
      // If no messages, hide the pop-up
      setShowMessage(false);
    }

    // Reset form fields if the submission is successful
    if (success) {
      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPhoneNumber("");
      setGender("");
      setPassword("");
      setConfirmPassword("");

      // redirect to login page on succesful registration
      router.push("/login");
    } else {
      // Clear the field causing the error and focus on it
      switch (error[0]) {
        case "First name is required.":
          setFirstName("");
          firstNameRef.current.focus();
          break;
        case "Last name is required.":
          setLastName("");
          lastNameRef.current.focus();
          break;
        case "Username is required.":
          setUsername("");
          usernameRef.current.focus();
          break;
        case "Email is required":
          setEmail("");
          emailRef.current.focus();
          break;
        case "Phone number is required.":
          setPhoneNumber("");
          phoneNumberRef.current.focus();
          break;
        case "Gender is required.":
          setGender("");
          genderRef.current.focus();
          break;
        case "Password is required.":
          setPassword("");
          passwordRef.current.focus();
          break;
        // Add more cases for specific error messages, if needed
        default:
          // Reset all fields if the error is not related to a specific field
          setFirstName("");
          setLastName("");
          setUsername("");
          setEmail("");
          setPhoneNumber("");
          setGender("");
          setPassword("");
          confirmPasswordRef.current.focus();
          break;
      }
    }
  };
  // Function to toggle password visibility
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="flex justify-center items-center flex-grow min-h-screen p-2 border shadow-2xl bg-green-50">
      <div className="flex flex-col gap-4 p-5 bg-gree-200 w-3/4">
        <h1 className="text-2xl font-bold text-center text-blue-600 py-2">
          Registration Form
        </h1>
        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="py-4 mt-4 border-t flex flex-col gap-5 max-h-[80vh] overflow-y-auto bg-green-100">
          {/* First Name */}
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              id="firstName"
              placeholder="John"
              ref={firstNameRef}
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="text"
              id="lastName"
              placeholder="Doe"
              ref={lastNameRef}
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              id="username"
              placeholder="johndoe123"
              ref={usernameRef}
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="Email">Email:</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="stevensaidimu@gmail.com"
              id="email"
              ref={emailRef}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              type="text"
              id="phoneNumber"
              placeholder="123-456-7890"
              ref={phoneNumberRef}
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender">Gender</label>
            <select
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              ref={genderRef}
              id="gender">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Password */}

          <label htmlFor="password">Password</label>
          <div className="relative">
            {" "}
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              id="password"
              ref={passwordRef}
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => togglePasswordVisibility("password")}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative">
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm Password"
              id="confirmPassword"
              ref={confirmPasswordRef}
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => togglePasswordVisibility("confirmPassword")}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-auto"
              type="submit">
              Register
            </button>
          </div>
        </form>

        {/* Error/Success Display as Pop-up */}
        {showMessage && (
          <div
            className={`fixed top-1/4 left-1/4 z-50 p-4 rounded-md border ${
              isSuccess
                ? "border-green-600 bg-green-100 text-green-800"
                : "border-red-600 bg-red-100 text-red-800"
            } animate-pulse`}>
            {messageContent.map((message, index) => (
              <div key={index} className="px-5 py-2">
                {message}
              </div>
            ))}
            {/* Close button to hide the pop-up */}
            <button
              className="text-xs text-gray-500 mt-2 focus:outline-none"
              onClick={() => setShowMessage(false)}>
              Close
            </button>
          </div>
        )}

        <div className=" bg-green-200 p-4">
          <GoogleRegister />
        </div>
        <div className="bg-green-200">
          <InquiryComponent />
        </div>
      </div>
    </div>
  );
}
