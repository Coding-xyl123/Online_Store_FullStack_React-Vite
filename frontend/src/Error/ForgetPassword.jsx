/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/forgot-password",
        {
          email: data.email,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setMessage("Failed to send password reset email");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      {/* Card Container */}
      <div className="bg-white w-full max-w-md rounded-md shadow-md p-6 relative">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 text-center mb-8">
          Forgot Password
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("email", { required: true })}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500">Email is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md text-sm hover:bg-indigo-700 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>

        {/* Message */}
        {message && <p className="text-sm text-center mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
