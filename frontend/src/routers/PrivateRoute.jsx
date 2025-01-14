/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { current } from "@reduxjs/toolkit";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
