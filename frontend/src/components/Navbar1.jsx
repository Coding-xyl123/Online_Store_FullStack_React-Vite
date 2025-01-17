/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { RiUserStarLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import getImgUrl from "../utils/getImgUrl";
import {
  setUserId,
  setCartItems,
  saveCartToDb,
  loadCartFromDb,
} from "../redux/features/cart/cartSlice";
import { updateQuantity, removeItem } from "../redux/features/cart/cartSlice";
import { useAuth } from "../context/AuthContext";

const Navbar1 = () => {
  const { currentUser, logoutUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const getCartKey = (userId, userRole) => `cart_${userRole}_${userId}`;

  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Decode JWT token to get user info
          const user = JSON.parse(atob(token.split(".")[1]));
          const userId = user._id;
          const userRole = user.role;
          const cartKey = getCartKey(userId, userRole);

          // Try to get cart from localStorage first
          const savedCartItems = localStorage.getItem(cartKey);
          if (savedCartItems) {
            // Load cart specific to this user and role
            dispatch(
              setCartItems({
                items: JSON.parse(savedCartItems),
                userId,
                userRole,
              })
            );
          } else {
            // Load from database with user-specific data
            await dispatch(loadCartFromDb({ userId, userRole }));
          }

          // Set user ID and role in Redux store
          dispatch(setUserId({ userId, userRole }));
        } catch (error) {
          console.error("Error loading cart:", error);
        }
      }
    };

    loadCart();
  }, [dispatch]);
  useEffect(() => {
    if (currentUser && cartItems.length > 0) {
      const userId = currentUser._id;
      const userRole = currentUser.role;
      const cartKey = getCartKey(userId, userRole);

      // Save to localStorage with user-specific key
      localStorage.setItem(cartKey, JSON.stringify(cartItems));

      // Save to database with user identification
      dispatch(
        saveCartToDb({
          userId,
          userRole,
          cartItems,
        })
      );
    }
  }, [cartItems, currentUser, dispatch]);

  useEffect(() => {
    if (location.pathname === "/p" || location.pathname === "/user") {
      if (currentUser) {
        const userId = currentUser._id;
        const userRole = currentUser.role;
        const cartKey = `cart_${userRole}_${userId}`;
        dispatch(setUserId({ userId, userRole }));
        const savedCartItems = localStorage.getItem(cartKey);
        if (savedCartItems) {
          dispatch(setCartItems(JSON.parse(savedCartItems)));
        }
      }
    }
  }, [location, currentUser, dispatch]);

  const handleLogOut = async () => {
    try {
      const userId = currentUser._id;
      const userRole = currentUser.role;
      const cartKey = `cart_${userRole}_${userId}`;
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
      await dispatch(saveCartToDb({ userId, userRole, cartItems }));
      await logoutUser();
      alert("Logged out successfully");
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const subtotal = cartItems.reduce(
    (total, item) => total + item.newPrice * item.quantity,
    0
  );
  const tax = (subtotal * 0.1).toFixed(2); // Assume 10% tax
  const estimatedTotal = (subtotal + parseFloat(tax) - discount).toFixed(2);

  const applyDiscount = () => {
    if (discountCode === "20 DOLLAR OFF") {
      setDiscount(20);
    } else {
      alert("Invalid discount code");
    }
  };

  return (
    <header className="bg-[#1B1B1B] text-white">
      {/* Desktop Navigation */}
      <nav className="max-w-screen-2xl mx-auto px-4 py-3 hidden md:flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Management</span>
          <span className="text-xs size-2">Chuwa</span>
        </div>

        <div className="relative flex-grow max-w-2xl mx-4">
          <CiSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-3 rounded-sm text-black focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <RiUserStarLine className="text-2xl" />
            <div>
              {currentUser ? (
                <button onClick={handleLogOut} className="text-sm">
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <span className="text-sm">Login</span>
                </Link>
              )}
            </div>
          </div>

          {currentUser && (
            <div
              onClick={toggleCart}
              className="cursor-pointer flex items-center gap-2"
            >
              <div className="relative">
                <IoCartOutline className="text-2xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-3 bg-red-500 text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-sm">${subtotal.toFixed(2)}</span>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar / Cart Overlay */}
      {isCartOpen && currentUser && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleCart}
          ></div>

          <div className="fixed top-0 right-0 w-full md:w-[400px] h-screen md:h-5/6 bg-white shadow-xl z-50 flex flex-col text-black">
            {/* Header Section */}
            <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
              <h2 className="text-xl">Cart ({totalItems})</h2>
              <button
                onClick={toggleCart}
                className="text-2xl text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-0 mb-4">
                  {/* Image */}
                  <img
                    src={getImgUrl(item.coverImage)}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md shadow-sm"
                  />

                  {/* Item Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-gray-800">
                        {item.title}
                      </h3>
                      <span className="text-lg text-blue-600 font-bold border: border-gray-300">
                        ${item.newPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Controls and Remove Button */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item._id,
                                newQuantity: item.quantity - 1,
                              })
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-200"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 border border-gray-300 text-gray-700 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item._id,
                                newQuantity: item.quantity + 1,
                              })
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeItem(item._id))}
                        className="h-8 px-3 flex items-center text-sm font-normal underline hover:bg-gray-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Discount Code */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="20 DOLLAR OFF"
                  className="flex-1 border rounded px-3 py-2"
                />
                <button
                  onClick={applyDiscount}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-gray-50 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Estimated total</span>
                <span>${estimatedTotal}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="p-4 border-t">
              <button className="w-full bg-blue-600 text-white py-3 rounded">
                Continue to checkout
              </button>
            </div>
          </div>
        </>
      )}

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-[#1B1B1B] h-full">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold">M</span>
            <span className="text-xs">Chuwa</span>
          </div>
          <div className="flex items-center gap-6">
            {currentUser ? (
              <button onClick={handleLogOut} className="text-sm">
                Logout
              </button>
            ) : (
              <Link to="/login">
                <RiUserStarLine className="text-xl" />
              </Link>
            )}
            {currentUser && (
              <div onClick={toggleCart} className="relative cursor-pointer">
                <IoCartOutline className="text-xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 px-3 pr-10 rounded text-black"
            />
            <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar1;
