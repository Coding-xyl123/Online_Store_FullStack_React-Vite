/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [emailError, setEmailError] = useState(""); // Email error state
  const [passwordError, setPasswordError] = useState(""); // Password error state
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (e) => {
    e.preventDefault(); // Prevent form submission

    let isValid = true;

    // Validate email
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Invalid Email input!");
      isValid = false;
    } else {
      setEmailError(""); // Clear the error if valid
    }

    // Validate password (at least 6 characters)
    if (!password || password.length < 6) {
      setPasswordError("Invalid Password input!");
      isValid = false;
    } else {
      setPasswordError(""); // Clear the error if valid
    }

    if (isValid) {
      console.log("Form submitted successfully!");
      // Proceed with form submission or API call
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      {/* Card Container */}
      <div className="bg-white w-full max-w-md rounded-md shadow-md p-6 relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          &times;
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 text-center mb-8">
          Sign up an account
        </h2>

        {/* Form */}
        <form onSubmit={validateForm}>
          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3  py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-1 ${
                emailError
                  ? "border-red-500 focus:ring-red-500  "
                  : "focus:ring-red-500 "
              }`}
            />
            {emailError && (
              <p className="text-sm text-red-500 ml-64 ">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6 ">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2  border rounded-md text-gray-900 focus:outline-none focus:ring-1 ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-red-500"
                }`}
              />
              {passwordError && (
                <p className="text-sm text-red-500 ml-60">{passwordError}</p>
              )}
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md text-sm hover:bg-indigo-700 transition duration-200"
          >
            Create account
          </button>
        </form>

        {/* Bottom Link */}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">Already have an account? </span>
          <a href="/login" className="text-indigo-600 underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
