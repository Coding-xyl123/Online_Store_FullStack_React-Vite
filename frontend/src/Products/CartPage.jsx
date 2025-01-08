/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";

import React, { useState, useEffect } from "react";
import BookCardd from "../Products/BookCardd";

const categories = ["last added", "price: low to high", "price: high to low"];

const CartPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("last added");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // Two rows of 5 columns

  useEffect(() => {
    fetch("book1.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  // Sorting logic
  const sortedBooks =
    selectedCategory === "last added"
      ? books
      : selectedCategory === "price: low to high"
      ? [...books].sort((a, b) => a.newPrice - b.newPrice)
      : [...books].sort((a, b) => b.newPrice - a.newPrice);

  // Paginated Books
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBooks = sortedBooks.slice(startIndex, endIndex);

  const totalPages = Math.ceil(books.length / itemsPerPage);

  // Handle Pagination
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="py-10 px-6 bg-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl font-semibold">Products</h2>
        <div className="flex flex-wrap justify-end items-center gap-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="category"
              className="text-lg font-medium whitespace-nowrap"
            >
              Sort by:
            </label>
            <select
              id="category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 bg-white rounded-md px-4 py-2 focus:outline-none"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {/* Add product button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Product
          </button>
        </div>
      </div>

      {/* Dropdown Filter */}

      {/* Grid Layout */}
      <div className="grid bg-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-9 py-9">
        {paginatedBooks.map((book, index) => (
          <BookCardd key={index} book={book} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 py-5">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 text-sm font-bold border rounded-md ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white"
          }`}
        >
          «
        </button>

        {/* Page numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 text-sm font-semibold rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-blue-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 text-sm font-bold border rounded-md ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white"
          }`}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default CartPage;
