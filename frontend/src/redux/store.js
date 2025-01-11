/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
// eslint-disable-next-line no-unused-vars
import productsReducer from "../redux/features/cart/productSlice";
import { addProduct } from "../redux/features/cart/productSlice";
import booksApi from "../redux/products/booksApi";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

export default store;
