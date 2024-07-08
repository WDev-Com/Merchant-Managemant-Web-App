import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  user: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export const selectLoggedInUser = (state) => state.auth.user;
export default AuthSlice.reducer;
