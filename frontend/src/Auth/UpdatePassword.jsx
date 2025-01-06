/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const UpdatePassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white  h-72 max-w-xl rounded-sm shadow-md p-9 relative">
        {/* Close button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-xl text-center font-bold text-gray-900 mb-2">
          Update your password
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Enter your email link, we will send you the recovery link
        </p>

        {/* Form */}
        <form>
          {/* Email input */}
          <div className="mb-4">
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
              placeholder="your_email@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
