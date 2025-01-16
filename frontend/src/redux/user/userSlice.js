import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logOutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
