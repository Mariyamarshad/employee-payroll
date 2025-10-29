import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AuthAPI from "../../utils/APIs/AuthAPIs";
import { toast } from "sonner"

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password, confirmPassword, role }) => {
    try {
      const res = await axios[AuthAPI.signUp.method](AuthAPI.signUp.url, {
        name,
        email,
        password,
        confirmPassword,
        role,
      },
      { withCredentials: true});
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "signup failed. please try again.";
      throw message;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue}) => {
    try {
        const res = await axios[AuthAPI.login.method] (AuthAPI.login.url, 
            { email,password },
            { withCredentials: true }
            )
        return res.data.user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (__, { rejectWithValue })=> {
    try {
      await axios[AuthAPI.logout.method](AuthAPI.logout.url,
        {},
        { withCredentials: true }
        )
        return true
    } catch (err) {
      return rejectWithValue("Logout failed")
    }
  }
)

 export const getCurrentUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios[AuthAPI.currentUser.method](
        AuthAPI.currentUser.url,
        { withCredentials: true }
      );
      return res.data.user;
    } catch (err) {
      return rejectWithValue("Not authenticated");
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
    },
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
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error= null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =  action.payload;
        toast.error("Invalid username or password")
      })
       .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
      })
  },
});

export const { resetSignupSuccess } = authSlice.actions;
export default authSlice.reducer;
