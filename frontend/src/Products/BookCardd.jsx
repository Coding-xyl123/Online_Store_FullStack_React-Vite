/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { FiShoppingCart } from "react-icons/fi";

// const BookCardd = ({ book }) => {
//   return (
//     <div className=" rounded-lg transition-shadow duration-300">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4">
//         <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
//           <a href="/">
//             <img
//               src={`${getImgUrl(book.coverImage)}`}
//               alt=""
//               className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
//             />
//           </a>
//         </div>

//         <div>
//           <Link to={`/book/${book._id}`}>
//             <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
//               {book.title}
//             </h3>
//           </Link>
//           <p className="text-gray-600 mb-5">
//             {book.description.length > 80
//               ? `${book.description.slice(0, 80)}...`
//               : book.description}
//           </p>
//           <p className="font-medium mb-5">
//             ${book?.newPrice}{" "}
//             <span className="line-through font-normal ml-2">
//               ${book?.oldPrice}
//             </span>
//           </p>
//           <button className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
//             <FiShoppingCart className="" />
//             <span>Add to Cart</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, updateQuantity } from "../redux/features/cart/cartSlice";
import getImgUrl from "../utils/getImgUrl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const BookCardd = ({ book }) => {
  const cartItem = useSelector((state) =>
    state.cart.cartItems.find((item) => item.id === book._id)
  );
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);
  const dispatch = useDispatch();
  const ProductList = () => {
    const products = useSelector((state) => state.products.products);
  };
  // Sync local state when Redux changes (e.g., due to sidebar updates, etc.)
  useEffect(() => {
    setQuantity(cartItem?.quantity || 0);
  }, [cartItem]);

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

  const handleAddClick = () => {
    setQuantity(1);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    dispatch(
      addToCart({
        product: book,
        quantity: 1, // Add 1 item when incrementing
      })
    );
    setQuantity((prevQuantity) => prevQuantity + 1);
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
    <div className="rounded-lg p-4 border border-gray-300 transition-shadow duration-300 hover:shadow-lg flex flex-col justify-between">
      {/* Book Image */}
      <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-200 mb-4">
        <Link to={`/book/${book._id}`}>
          <img
            src={`${getImgUrl(book.coverImage)}`}
            alt={book.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Book Content */}
      <div className="flex flex-col gap-2">
        {/* Title */}
        <Link to={`/book/${book._id}`}>
          <h3 className="text-sm font-semibold text-center hover:text-blue-600 hover:underline transition duration-200">
            {book.title}
          </h3>
        </Link>

        {/* Pricing */}
        <p className="text-center text-gray-800 text-sm">
          ${book.newPrice}{" "}
          <span className="line-through text-xs text-gray-500">
            ${book.oldPrice}
          </span>
        </p>
      </div>

      {/* Actions */}
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
              onClick={() => {
                handleIncrement();
              }}
              className="bg-gray-200 text-black px-3 py-1 rounded-r hover:bg-gray-300"
            >
              +
            </button>
          </div>
        )}
        <button
          className="flex-1  bg-white text-black border border-gray-500 text-sm py-1 rounded-md hover:bg-white transition"
          aria-label={`Edit ${book.title}`}
        >
          <Link to={`/create`}>Edit</Link>
        </button>
      </div>
    </div>
  );
};

export default BookCardd;
