/* eslint-disable no-unused-vars */
import React from "react";

const Error = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      {/* Card Container */}
      <div className="bg-white  text-center rounded-md shadow-md py-60 px-96">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <span className="text-indigo-600 text-5xl border-2 border-indigo-600 rounded-full w-16 h-16 flex items-center justify-center">
            &#x21; {/* Exclamation Mark */}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Oops, something went wrong!
        </h2>

        {/* Button */}
        <button className="w-52 bg-indigo-600 text-white py-2 rounded-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Error;
