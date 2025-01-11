/* eslint-disable no-empty-pattern */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";

const AuthAContext = createContext();
export const useAuth = () => {
  return useContext(AuthAContext);
};

//authProvider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //register a usesr
  const registerUser = async (email, password) => {
    return await auth.createUserWithEmailAndPassword(auth, email, password);
  };
  const value = {
    currentUser,
    registerUser,
  };
  return (
    <AuthAContext.Provider value={{ value }}>{children}</AuthAContext.Provider>
  );
};
