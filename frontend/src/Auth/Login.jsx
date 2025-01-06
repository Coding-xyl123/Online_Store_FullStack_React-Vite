/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {/* Card Container */}
      <div className="bg-white w-full max-w-sm shadow-md rounded-md p-5 sm:p-6">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-6 sm:mb-8">
          Sign in to your account
        </h2>

        {/* Form */}
        <form>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {/* Toggle Password Visibility */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-indigo-600 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md text-sm sm:text-base hover:bg-indigo-700 transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Bottom Links */}
        <div className="mt-6 flex flex-col items-center sm:flex-row sm:justify-between text-sm">
          <p className="text-gray-400 mb-4 sm:mb-0">
            Don’t have an account?{" "}
            <a href="/register" className="text-indigo-600 underline">
              Sign up
            </a>
          </p>
          <a href="/forgot-password" className="text-indigo-600 underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
