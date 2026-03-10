import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import RequestsAPI from "../../utils/APIs/RequestsAPI";
import { toast } from "sonner";

export const createRequest = createAsyncThunk(
  "requests/create",
  async (data) => {
    return await RequestsAPI.createRequest(data);
  },
);

export const fetchRequests = createAsyncThunk("requests/fetchAll", async () => {
  return await RequestsAPI.fetchRequests();
});

export const replyRequest = createAsyncThunk(
  "requests/reply",
  async ({ id, message }) => {
    return await RequestsAPI.replyRequest({ id, message });
  },
);

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      });
  },
});

export default requestSlice.reducer;
