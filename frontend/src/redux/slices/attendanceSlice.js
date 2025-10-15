import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as attendanceApi from "../../utils/APIs/Attendance";
import { toast } from "sonner";

export const fetchUserAttendance = createAsyncThunk(
  "attendance/fetchUserAttendance",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await attendanceApi.getUserAttendance(userId);
      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to fetch attendance" }
      );
    }
  }
);

export const checkIn = createAsyncThunk(
  "attendance/checkIn",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await attendanceApi.checkIn(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkOut = createAsyncThunk(
  "attendance/checkOut",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await attendanceApi.checkOut(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    records: [],
    isCheckedIn: false,
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAttendance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserAttendance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records = action.payload;

        if (action.payload.length > 0) {
          const latest = action.payload[action.payload.length - 1];
          state.isCheckedIn = !latest.checkOutTime;
        } else {
          state.isCheckedIn = false;
        }
      })
      .addCase(fetchUserAttendance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Something went wrong";
      })

      .addCase(checkIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.loading = false;
        state.isCheckedIn = true;
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.loading = false;
        toast.error(
          action.payload?.message || "You have already checked in today!"
        );
      })

      .addCase(checkOut.fulfilled, (state, action) => {
        state.loading = false;
        state.isCheckedIn = false;
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.loading = false;
        toast.error(
          action.payload?.message || "You have already checked out today!"
        );
      });
  },
});

export default attendanceSlice.reducer;
