/* eslint-disable no-unused-vars */
import { CiSearch } from "react-icons/ci";
import { RiUserStarLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart", href: "/cart" },
  { name: "Checkout", href: "/checkout" },
];

const Navbar = () => {
  const currentUser = true;
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
                <Link to="/login">
                  <span className="text-sm">Sign In</span>
                </Link>
              ) : (
                <Link to="/">
                  <span className="text-sm">Sign Out</span>
                </Link>
              )}
            </div>
          </div>

          <Link to="/cart" className="flex items-center gap-2">
            <div className="relative">
              <IoCartOutline className="text-2xl" />
            </div>
            <span className="text-sm">$0.00</span>
          </Link>
        </div>
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
            <Link to="/login">
              <RiUserStarLine className="text-xl" />
            </Link>
            <Link to="/cart" className="flex items-center">
              <IoCartOutline className="text-xl" />
              <span className="text-xs ml-1">$0.00</span>
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
