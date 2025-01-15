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
import TopSelling from "../Home/TopSelling";
import Home from "../Home/Home";
import CartPage1 from "../Products/CartPage";
import CreateProduct from "../Products/CreateProduct";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "../routers/PrivateRoute";
import Product from "../Home/Product";
import AdminRoute from "./AdminRoute";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AdminLogin from "../components/AdminLogin";
import User from "../Home/User";
import ProductDetail1 from "../Home/ProductDetails1";
import RegisterAdmin from "../Auth/RegisterAdmin";
import ForgotPassword from "../Error/ForgetPassword";
import Dashboard from "../dashboard/DashboardLayout";
import DashboardLayout from "../dashboard/DashboardLayout";
import ManageBook from "../dashboard/Manage/ManageBook";
import Add from "../dashboard/Add/Add";
import Update from "../dashboard/Edit/Update";

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
        path: "/user",
        element: <User />,
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
        path: "/admin",
        element: <AdminLogin />,
      },
      {
        path: "/adminSignUp",
        element: <RegisterAdmin />,
      },
      {
        path: "/p",
        element: <TopSelling />,
      },
      {
        path: "/product",
        element: (
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        ),
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/forget",
        element: <ForgotPassword />,
      },
      {
        path: "/create",
        element: <CreateProduct />,
      },
      {
        path: "/book/:id",
        element: <ProductDetails />,
      },
      {
        path: "/book/:id/p",
        element: <ProductDetail1 />,
      },
      {
        path: "/d",
        element: (
          <AdminRoute>
            {/* <TopSelling />, */}
            <DashboardLayout />
          </AdminRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <AdminRoute>
                <div>Admin Dash</div>
              </AdminRoute>
            ),
          },
          {
            path: "add-new-book",
            element: (
              <AdminRoute>
                <CreateProduct />
              </AdminRoute>
            ),
          },
          {
            path: "edit-book/:id",
            element: (
              <AdminRoute>
                <Add />
              </AdminRoute>
            ),
          },
          {
            path: "manage-books",
            element: (
              <AdminRoute>
                <ManageBook />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
