/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// filepath: /Users/xiangyangliu/Desktop/untitled folder/frontend/src/Products/BookCardd.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import getImgUrl from "../utils/getImgUrl";
import { Link } from "react-router-dom";

const BookCardd = ({ book }) => {
  const cartItem = useSelector((state) =>
    state.cart.cartItems.find((item) => item.id === book._id)
  );
  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(cartItem?.quantity || 0);
  }, [cartItem]);

  const handleAddToCart = () => {
    const itemQuantity = quantity > 0 ? 1 : quantity + 1;

    dispatch(
      addToCart({
        product: book,
        quantity: itemQuantity,
      })
    );

    if (quantity === 0) setQuantity(1);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    dispatch(
      addToCart({
        product: book,
        quantity: 1,
      })
    );
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      dispatch(
        addToCart({
          product: book,
          quantity: -1,
        })
      );
    } else {
      dispatch(
        addToCart({
          product: book,
          quantity: -1,
        })
      );
      setQuantity(0);
    }
  };

  return (
    <div className="rounded-lg p-4 border border-gray-300 transition-shadow duration-300 hover:shadow-lg flex flex-col justify-between">
      <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-200 mb-4">
        <Link to={`/book/${book._id}`}>
          <img
            src={`${getImgUrl(book.coverImage)}`}
            alt={book.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <Link to={`/book/${book._id}`}>
          <h3 className="text-sm font-semibold text-center hover:text-blue-600 hover:underline transition duration-200">
            {book.title}
          </h3>
        </Link>

        <p className="text-center text-gray-800 text-sm">
          ${book.newPrice}{" "}
          <span className="line-through text-xs text-gray-500">
            ${book.oldPrice}
          </span>
        </p>
      </div>

      <div className="mt-4 flex justify-between gap-2">
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-500 text-white text-sm py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              className="bg-gray-200 text-black px-3 py-1 rounded-l hover:bg-gray-300"
            >
              -
            </button>
            <span className="px-4 font-medium">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="bg-gray-200 text-black px-3 py-1 rounded-r hover:bg-gray-300"
            >
              +
            </button>
          </div>
        )}
        <button
          className="flex-1 bg-white text-black border border-gray-500 text-sm py-1 rounded-md hover:bg-white transition"
          aria-label={`Edit ${book.title}`}
        >
          <Link to={`/d/edit-book/${book._id}`}>Edit</Link>
        </button>
      </div>
    </div>
  );
};

export default BookCardd;
