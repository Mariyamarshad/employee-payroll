import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AuthAPI from "../../utils/APIs/AuthAPIs";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async({ name, email, password, confirmPassword, role }) => {
   try {
    const res = await axios[AuthAPI.signUp.method](AuthAPI.signUp.url, {
    name, email, password, confirmPassword, role,
   })
   return res.data;
   } catch (err) {
    const message = err.response?.data?.message || "signup failed. please try again."
    throw message;

  }
  } 
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        signupSuccess: false,
    },
    reducers: {
        resetSignupSuccess: (state) => {
            state.signupSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false;
            state.signupSuccess = true;
            state.user = action.payload;
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export const { resetSignupSuccess } = authSlice.actions;
export default authSlice.reducer; 
