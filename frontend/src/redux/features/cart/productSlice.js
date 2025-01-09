import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // Make sure this is populated with your books data
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload; // Set the products array with the payload data
    },
    addProduct: (state, action) => {
      state.products.push(action.payload); // Add the new product to the products list
    },
  },
});

export const { setProducts, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
