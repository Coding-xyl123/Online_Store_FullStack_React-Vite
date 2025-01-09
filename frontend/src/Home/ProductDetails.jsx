/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import getImgUrl from "../utils/getImgUrl";
import axios from "axios";
import { setProducts } from "../redux/features/cart/productSlice";
import { addToCart, updateQuantity } from "../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Extract `id` from the URL
  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const book = products.find((product) => product._id.toString() === id);
  const cartItem = cartItems.find((item) => item.id === book?._id);
  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/book1.json"); // Adjust API endpoint
        if (Array.isArray(response.data)) {
          dispatch(setProducts(response.data)); // Dispatch only if data is an array
        } else {
          console.error("Expected an array but got:", response.data);
          dispatch(setProducts([])); // Ensure state consistency
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        dispatch(setProducts([])); // Ensure state consistency
      }
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    console.log("Product ID from URL:", id);
    console.log("Products in state:", products);
    console.log("Product found:", book);
  }, [id, products, book]);

  if (!book) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    const itemQuantity = quantity > 0 ? 1 : quantity + 1; // Use the quantity or set default to 1

    // Dispatch to Redux store
    dispatch(
      addToCart({
        product: book, // Assuming book contains all necessary product info
        quantity: itemQuantity,
      })
    );

    // Update the local quantity state only if it was initially 0
    if (quantity === 0) setQuantity(1);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    dispatch(
      addToCart({
        product: book,
        quantity: 1, // Add 1 item when incrementing
      })
    );
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      dispatch(
        addToCart({
          product: book,
          quantity: -1, // Remove 1 item when decrementing
        })
      );
    } else {
      dispatch(
        addToCart({
          product: book,
          quantity: -1, // Remove the last item from the cart
        })
      );
      setQuantity(0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Details</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={`${getImgUrl(book.coverImage)}`}
            alt={book.title}
            className="w-full rounded-lg border border-gray-200 shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-gray-600 mb-2">{book.category}</p>
          <h2 className="text-4xl font-medium mb-4">{book.title}</h2>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold">${book.newPrice}</span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
              {book.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            {book.description}
          </p>
          <div className="flex items-center gap-4">
            {quantity === 0 ? (
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-l"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <span className="px-6 py-2 bg-blue-600 text-white">
                  {quantity}
                </span>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-r"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            )}
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
