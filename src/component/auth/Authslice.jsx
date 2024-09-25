import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUpUser, loginUser, logoutUser } from "./AuthAPI";
import { toast } from "react-toastify";
const initialState = {
  status: null,
  signup: false,
  token: null,
  userInfo: null,
  error: null,
};

export const signUpUserAsync = createAsyncThunk(
  "auth/signUpUser",
  async (userData) => {
    try {
      // console.log("From Slice : ", userData);
      const response = await signUpUser(userData);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    try {
      const response = await loginUser(userData);
      // console.log("From Slice : ", response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const logoutUserAsync = createAsyncThunk("auth/logoutUser", async () => {
  try {
    // console.log("From Slice : ", userData);
    const response = await logoutUser();
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp(state, action) {
      state.signup = false;
    },
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUpUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // state.token = action.payload;
        state.signup = true;
        state.error = null;
      })
      .addCase(signUpUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(`SignUp Failed: ${state.error}`);
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.token;
        state.userInfo = action.payload.userInfo;
      })

      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = null;
        state.userInfo = null;
      });
  },
});

export const { login, logout, signUp } = AuthSlice.actions;
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectToken = (state) => state.auth.token;
export const selectSignup = (state) => state.auth.signup;
export const authError = (state) => state.auth.error;
export const selectLoggedInUser = (state) => state.auth.user;
export default AuthSlice.reducer;
