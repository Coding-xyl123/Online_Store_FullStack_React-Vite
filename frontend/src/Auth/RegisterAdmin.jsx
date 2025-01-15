/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const RegisterAdmin = () => {
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [usernameError, setUsernameError] = useState(""); // Username error state
  const [passwordError, setPasswordError] = useState(""); // Password error state
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validateForm = () => {
    let isValid = true;

    // Validate username
    if (!username) {
      setUsernameError("Invalid Email input!");
      isValid = false;
    } else {
      setUsernameError(""); // Clear the error if valid
    }

    // Validate password (at least 6 characters)
    if (!password || password.length < 6) {
      setPasswordError("Invalid Password input!");
      isValid = false;
    } else {
      setPasswordError(""); // Clear the error if valid
    }

    return isValid;
  };

  const onSubmit = async (data) => {
    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:5005/api/auth/create-admin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );

        if (response.ok) {
          alert("Admin account created successfully");
        } else {
          const errorData = await response.json();
          setMessage(errorData.message || "Failed to create an account");
        }
      } catch (error) {
        setMessage("Failed to create an account");
        console.error("Error creating account:", error);
      }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: true })}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-1 ${
                usernameError
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
            />
            {usernameError && (
              <p className="text-sm text-red-500 ml-64">{usernameError}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
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
                {...register("password", { required: true })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-1 ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-indigo-500"
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
          <Link to="/admin" className="text-indigo-600 underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
