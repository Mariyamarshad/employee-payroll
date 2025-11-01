import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as attendanceApi from "../../utils/APIs/attendance";
import { toast } from "sonner";

export const handleCheckIn = createAsyncThunk(
  "attendance/checkIn",
  async (userId) => {
    return await attendanceApi.checkIn(userId);
  }
);

export const handleCheckOut = createAsyncThunk(
  "attendance/checkOut",
  async (userId) => {
    return await attendanceApi.checkOut(userId);
  }
);

export const fetchAllAttendance = createAsyncThunk(
  "attendance/all",
  async (employeeId) => await attendanceApi.getAllAttendance(employeeId)
);

export const fetchTodayAttendance = createAsyncThunk(
  "attendance/today",
  async (employeeId) => await attendanceApi.getTodayAttendance(employeeId)
);

export const fetchSummary = createAsyncThunk(
  "attendance/summary",
  async (userId) => {
    return await attendanceApi.getAttendanceSummary(userId);
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    isCheckedIn: false,
    todayAttendance: null,
    records: [],
    loading: false,
    summary: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleCheckIn.fulfilled, (state, action) => {
        if (action.payload?.attendance) {
          state.isCheckedIn = true;
          state.todayAttendance = action.payload.attendance;
          toast.success(action.payload.message || "Checked in!");
        } else {
          toast.error(action.payload?.message || "Cannot check-in right now!");
        }
      })
      .addCase(handleCheckIn.rejected, () => {
        toast.error("Check-in failed!");
      })
            .addCase(fetchAllAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchAllAttendance.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to load attendance data");
      })


      .addCase(fetchTodayAttendance.fulfilled, (state, action) => {
        const today = action.payload?.attendance;
        state.todayAttendance = today;

        if (today?.checkIn && !today?.checkOut) {
          state.isCheckedIn = true;
        } else {
          state.isCheckedIn = false;
        }
      })

      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summary = action.payload || null;
      });
  },
});

export default attendanceSlice.reducer;
