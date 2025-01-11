/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */

import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar1";
import Footer from "./components/Footer";
import CartPage from "./Products/CartPage";
import TopSellingg from "./Home/TopSelling";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import BookCardd from "../src/Products/BookCardd";
import ProductDetails from "../src/Home/ProductDetails";
import CreateProduct from "./Products/CreateProduct";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [showCart, setShowCart] = useState(false);
  return (
    <>
      <AuthProvider>
        <Navbar setShowCart={setShowCart} />
        <main className="font-primary">
          <Routes>{/* <Route path="/" element={<TopSellingg />} /> */}</Routes>
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
