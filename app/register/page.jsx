/** @format */
"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

  /**
   * Handles form submission.
   * Performs validation and sends data to the server.
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validates if passwords match
    if (password !== confirmPassword) {
      setError(["Passwords do not match"]);
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
        confirmPassword,
      }),
    });

    // Handle API response
    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);

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
    <div className="flex justify-center items-center flex-grow min-h-screen p-2 border shadow-2xl">
      <div className="flex flex-col gap-4 p-5 bg-white w-3/4">
        <h1 className="text-2xl font-bold text-center text-blue-600 py-2">
          Registration Form
        </h1>
        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="py-4 mt-4 border-t flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
          {/* First Name */}
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              id="firstName"
              placeholder="John"
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
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender">Gender</label>
            <select
              onChange={(e) => setGender(e.target.value)}
              value={gender}
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

        {/* Error/Success Display */}
        <div className="bg-slate-100 flex flex-col">
          {error &&
            error.map((e, index) => (
              <div
                key={index}
                className={`${
                  success ? "text-green-800" : "text-red-600"
                } px-5 py-2`}>
                {e}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
