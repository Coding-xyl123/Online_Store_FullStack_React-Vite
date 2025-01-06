/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../Error/Error";
import Register from "../Auth/Register";
import UpdatePassword from "../Auth/UpdatePassword";
import ChangePassword from "../Auth/ChangePassword";
import Login from "../Auth/Login";
import ProductDetails from "../Home/ProductDetails";
import TopSelling from "..//TopSelling";
import Home from "../Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Error />,
      },
      {
        path: "/error",
        element: <Error />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/updatePassword",
        element: <UpdatePassword />,
      },
      {
        path: "/changePassword",
        element: <ChangePassword />,
      },
      {
        path: "/productDetails",
        element: <ProductDetails />,
      },
      {
        path: "/p",
        element: <TopSelling />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

export default router;
