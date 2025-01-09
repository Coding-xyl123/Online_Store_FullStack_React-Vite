import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0, // New property for cart total
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === product._id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else if (quantity > 0) {
        state.cartItems.push({ ...product, id: product._id, quantity });
      }

      state.cartItems = state.cartItems.filter((item) => item.quantity > 0);
      state.totalQuantity = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        if (newQuantity <= 0) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        } else {
          existingItem.quantity = newQuantity;
        }
      }
      state.totalQuantity = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      state.totalQuantity = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0; // Reset price as well
    },
  },
});

export const { addToCart, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
