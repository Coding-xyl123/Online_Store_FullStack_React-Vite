/* eslint-disable no-dupe-keys */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: [],
//   totalQuantity: 0,
//   totalPrice: 0, // New property for cart total
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const { product, quantity } = action.payload;
//       const existingItem = state.cartItems.find(
//         (item) => item.id === product._id
//       );

//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else if (quantity > 0) {
//         state.cartItems.push({ ...product, id: product._id, quantity });
//       }

//       state.cartItems = state.cartItems.filter((item) => item.quantity > 0);
//       state.totalQuantity = state.cartItems.reduce(
//         (sum, item) => sum + item.quantity,
//         0
//       );
//     },
//     updateQuantity: (state, action) => {
//       const { id, newQuantity } = action.payload;
//       const existingItem = state.cartItems.find((item) => item.id === id);

//       if (existingItem) {
//         if (newQuantity <= 0) {
//           state.cartItems = state.cartItems.filter((item) => item.id !== id);
//         } else {
//           existingItem.quantity = newQuantity;
//         }
//       }
//       state.totalQuantity = state.cartItems.reduce(
//         (sum, item) => sum + item.quantity,
//         0
//       );
//     },
//     removeItem: (state, action) => {
//       const id = action.payload;
//       state.cartItems = state.cartItems.filter((item) => item.id !== id);
//       state.totalQuantity = state.cartItems.reduce(
//         (sum, item) => sum + item.quantity,
//         0
//       );
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//       state.totalQuantity = 0;
//       state.totalPrice = 0; // Reset price as well
//     },
//   },
// });

// export const { addToCart, updateQuantity, removeItem, clearCart } =
//   cartSlice.actions;
// export default cartSlice.reducer;
// eslint-disable-next-line no-unused-vars
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to save cart data to the database
export const saveCartToDb = createAsyncThunk(
  "cart/saveCartToDb",
  async (_, { getState }) => {
    const state = getState();
    const { userId, userRole, cartItems } = state.cart;

    // Save to localStorage with user-specific key
    const cartKey = `cart_${userRole}_${userId}`;
    localStorage.setItem(cartKey, JSON.stringify(cartItems));

    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, userRole, cartItems }),
    });
    return response.json();
  }
);

// Async thunk to load cart data from the database
export const loadCartFromDb = createAsyncThunk(
  "cart/loadCartFromDb",
  async ({ userId, userRole }) => {
    // Try localStorage first
    const cartKey = `cart_${userRole}_${userId}`;
    const localCart = localStorage.getItem(cartKey);

    // Then try server
    const response = await fetch(`/api/cart/${userRole}/${userId}`);
    if (!response.ok) {
      // If server fails but we have local data, use that
      if (localCart) {
        return { cartItems: JSON.parse(localCart) };
      }
      throw new Error("Failed to load cart");
    }

    const serverData = await response.json();

    // Merge local and server data if both exist
    if (localCart) {
      const localItems = JSON.parse(localCart);
      const mergedItems = mergeCartItems(localItems, serverData.cartItems);
      return { cartItems: mergedItems };
    }

    return serverData;
  }
);

const mergeCartItems = (localItems, serverItems) => {
  const mergedMap = new Map();

  [...localItems, ...serverItems].forEach((item) => {
    if (mergedMap.has(item.id)) {
      const existing = mergedMap.get(item.id);
      mergedMap.set(item.id, {
        ...existing,
        quantity: Math.max(existing.quantity, item.quantity),
      });
    } else {
      mergedMap.set(item.id, item);
    }
  });

  return Array.from(mergedMap.values());
};

const initialState = {
  userId: null,
  userRole: null,
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      // Only clear runtime state, keep localStorage
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setUserId: (state, action) => {
      const { userId, userRole } = action.payload || {};
      state.userId = userId;
      state.userRole = userRole;
    },
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
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.newPrice * item.quantity,
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
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.newPrice * item.quantity,
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
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.newPrice * item.quantity,
        0
      );
    },

    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.totalQuantity = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.newPrice * item.quantity,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCartFromDb.fulfilled, (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.totalQuantity = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.newPrice * item.quantity,
        0
      );
    });
  },
});

export const {
  setUserId,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
  setCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
