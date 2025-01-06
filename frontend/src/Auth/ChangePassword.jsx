/* eslint-disable no-unused-vars */
import React from "react";

const ChangePassword = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="bg-white text-center rounded-lg shadow-md p-8 relative max-w-md w-full">
        <button className="absolute top-4 right-4 text-black hover:text-gray-600 text-xl focus:outline-none">
          ×
        </button>

        <div className="flex justify-center mb-6">
          <span className="text-indigo-600">
            <svg
              className="h-12 w-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </span>
        </div>

        <p className="text-gray-900 text-center">
          We have sent the update password link to your email, please check that
          !
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;
