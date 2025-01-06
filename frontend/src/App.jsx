/* eslint-disable react/jsx-no-undef */

import "./App.css";
import { Outlet as OutLet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="font-primary">
        <OutLet />
      </main>
      <Footer />
    </>
  );
}

export default App;
