/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (loginData) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        await loginUser(data.user); // This will trigger re-render
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      alert("Logged in successfully");
      navigate("/user");
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.response?.data?.message || "Failed to login");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {/* Card Container */}
      <div className="bg-white w-full max-w-sm shadow-md rounded-md p-5 sm:p-6">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-6 sm:mb-8">
          Sign in to your account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500">Email is required</p>
            )}
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
                {...register("password", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.password && (
                <p className="text-sm text-red-500">Password is required</p>
              )}
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
            <Link to="/signup" className="text-indigo-600 underline">
              Sign up
            </Link>
          </p>
          <Link to="/forget" className="text-indigo-600 underline">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
