/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
// eslint-disable-next-line no-unused-vars
import productsReducer from "../redux/features/cart/productSlice";
import { addProduct } from "../redux/features/cart/productSlice";
import booksApi from "../redux/products/booksApi";
import authReducer from "../redux/authSlice";
import userReducer from "./user/userSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

export default store;
