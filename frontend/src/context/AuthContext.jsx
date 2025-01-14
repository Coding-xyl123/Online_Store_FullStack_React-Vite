/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/register",
        {
          username,
          password,
          role: "user", // Default role for new users
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };

  const registerAdmin = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/admin",
        {
          username,
          password,
          role: "admin", // Role for admin users
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error registering admin:", error);
      throw error;
    }
  };

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/login",
        {
          username,
          password,
        }
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5005/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setCurrentUser(response.data))
        .catch(() => localStorage.removeItem("token"));
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    registerUser,
    registerAdmin,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
