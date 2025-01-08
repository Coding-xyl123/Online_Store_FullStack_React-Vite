/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */

import "./App.css";
import { Outlet as OutLet } from "react-router-dom";
import Navbar from "./components/Navbar1";
import Footer from "./components/Footer";
import CartPage from "./Products/CartPage";
import { useState } from "react";
function App() {
  const [showCart, setShowCart] = useState(false);
  return (
    <>
      <Navbar setShowCart={setShowCart} />
      <main className="font-primary">
        <OutLet />
      </main>
      <Footer />
    </>
  );
}

export default App;
