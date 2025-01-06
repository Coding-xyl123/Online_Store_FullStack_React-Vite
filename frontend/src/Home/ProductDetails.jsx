/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import image from "../assets/img/assets/image.png";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products Detail</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={image}
            alt="Meta Quest 2 VR Headset"
            className="w-full rounded-lg border border-gray-200"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-md">
            <span>662</span>
            <span className="mx-2">⚡</span>
            <span>597</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">Category1</p>

          <h2 className="text-4xl font-medium">Meta Quest2 VR headset</h2>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">$299</span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
              Out of Stock
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Hundreds of hit games, one-of-a-kid experiences, live events, new
            ways to stay fit and a growing community Hundreds of hit games,
            one-of-a-kid experiences, live events, new ways to stay fit and a
            growing community
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-l"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="px-6 py-2 bg-blue-600 text-white">
                {quantity}
              </span>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-r"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
