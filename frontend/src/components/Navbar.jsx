/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { CiSearch } from "react-icons/ci";
import { RiUserStarLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { clearScreenDown } from "readline";

const Navbar = ({ setShowCart }) => {
  const { currentUser, logoutUser } = useAuth();
  const handleLogOut = async () => {
    try {
      await logoutUser();

      alert("Logged fajhkljhfla");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  ); // Total number of items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.newPrice * item.quantity,
    0
  ); // Total price of items
  //Calculate Total Price
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  return (
    <header className="bg-[#1B1B1B] text-white">
      {/* Desktop Navigation */}
      <nav className="max-w-screen-2xl mx-auto px-4 py-3 hidden md:flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Management</span>
          <text className="text-xs size-2">Chuwa</text>
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
                  <Link to="/login">LogOut</Link>
                </button>
              ) : (
                <Link to="/login">
                  <span className="text-sm">Login</span>
                </Link>
              )}
            </div>
          </div>

          <Link
            to="/cart"
            onClick={() => setShowCart(true)}
            className="flex items-center gap-2"
          >
            <div className="relative">
              <IoCartOutline className="text-2xl" />
              {totalItems > 0 ? (
                <span className="text-xs font-semibold sm:ml-1">
                  {totalItems}
                </span>
              ) : (
                <span className="text-xs font-semibold sm:ml-1">0</span>
              )}
            </div>
            <span className="text-sm">${totalPrice.toFixed(2)}</span>
          </Link>
        </div>
        {isCartOpen && (
          <div
            className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg z-50 flex flex-col"
            style={{ overflowY: "auto" }}
          >
            {/* Header Section */}
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Cart ({cartItems.length})
              </h2>
              <button
                onClick={toggleCart}
                className="text-2xl font-bold text-gray-600"
              >
                &times;
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-6 flex-grow overflow-y-auto">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 mb-6 border-b pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-blue-600 font-semibold">
                          ${item.newPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-600">
                          x {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">Your cart is empty.</p>
              )}
            </div>

            {/* Discount Section */}
            <div className="p-6 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Discount Code"
                  className="flex-1 border p-2 rounded"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Apply
                </button>
              </div>
            </div>

            {/* Subtotal, Tax, & Total */}
            <div className="p-6 border-t space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span className="font-semibold">
                  ${(totalPrice * 0.1).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span className="font-semibold">-$0.00</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${(totalPrice * 1.1).toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="p-6 border-t">
              <button className="bg-blue-600 text-white w-full py-3 rounded">
                Continue to Checkout
              </button>
            </div>
          </div>
        )}
      </nav>
      {/* Mobile Navigation */}
      <nav className="md:hidden">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <span className="text-lg font-bold">M</span>
            <text className="text-xs">chuwa</text>
          </div>
          <div className="flex items-center gap-4">
            {currentUser ? (
              <button onClick={handleLogOut} className="text-sm">
                Logout
              </button>
            ) : (
              <Link to="/login">
                <RiUserStarLine className="text-xl" />
              </Link>
            )}
            <Link to="/cart" className="flex items-center gap-2">
              <button
                onClick={() => setShowCart(true)}
                className="flex items-center gap-2"
              >
                <IoCartOutline className="text-xl" />
              </button>
              {cartItems.length > 0 ? (
                <span className="text-xs font-semibold sm:ml-1">
                  {cartItems.length}
                </span>
              ) : (
                <span className="text-xs font-semibold sm:ml-1">0</span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 px-3 rounded-sm text-black focus:outline-none"
            />
            <CiSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
