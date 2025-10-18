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

export const fetchAttendanceSummary = createAsyncThunk(
  "attendance/userSummary",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await attendanceApi.getAttendanceSummary(userId);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch attendance summary",
        }
      );
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    records: [],
    isCheckedIn: null,
    status: "idle",
    loading: false,
    error: null,
    summary: null,
    summaryLoading: false,
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

        const today = new Date().toISOString().split("T")[0];
        const todayRecord = action.payload.find((r) => r.date === today);

        if (todayRecord) {
          state.isCheckedIn = !todayRecord.checkOutTime;
        } else {
          state.isCheckedIn = false;
        }

        localStorage.setItem("isCheckedIn", state.isCheckedIn.toString());
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
        localStorage.setItem("isCheckedIn", "true");

        if (action.payload) {
          const newRecord = action.payload.data ?? action.payload;
          state.records = [...state.records, newRecord];
        }
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
        localStorage.setItem("isCheckedIn", "false");
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.loading = false;
        toast.error(
          action.payload?.message || "You have already checked out today!"
        );
      })

      .addCase(fetchAttendanceSummary.pending, (state) => {
        state.summaryLoading = true;
      })
      .addCase(fetchAttendanceSummary.fulfilled, (state, action) => {
        state.summaryLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchAttendanceSummary.rejected, (state, action) => {
        state.summaryLoading = false;
        state.error = action.payload?.message || "Failed to fetch summary";
      });
  },
});

export default attendanceSlice.reducer;
