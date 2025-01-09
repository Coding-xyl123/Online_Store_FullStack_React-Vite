/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../redux/features/cart/productSlice";
import BookCardd from "../Products/BookCardd";
import { Link } from "react-router-dom";

const categories = ["last added", "price: low to high", "price: high to low"];

const TopSellingg = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [selectedCategory, setSelectedCategory] = useState("last added");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Two rows of 5 columns

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/book1.json"); // Adjust API endpoint
        const data = await response.json();
        if (Array.isArray(data)) {
          dispatch(setProducts(data)); // Dispatch only if data is an array
        } else {
          console.error("Expected an array but got:", data);
          dispatch(setProducts([])); // Ensure state consistency
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        dispatch(setProducts([])); // Ensure state consistency
      }
    };

    fetchProducts();
  }, [dispatch]);

  // Sorting logic
  const sortedBooks =
    selectedCategory === "last added"
      ? products
      : selectedCategory === "price: low to high"
      ? [...products].sort((a, b) => a.price - b.price)
      : [...products].sort((a, b) => b.price - a.price);

  // Paginated Books
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBooks = sortedBooks.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Handle Pagination
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="py-10 px-6 bg-gray-100">
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
            <Link to="/create">Add Product</Link>
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {paginatedBooks.map((book) => (
          <BookCardd key={book._id} book={book} />
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

export default TopSellingg;
