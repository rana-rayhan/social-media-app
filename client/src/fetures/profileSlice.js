import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "profile/fetchUser",
  async (token) => {
    const res = await axios.get("http://localhost:4000/auth/profile", {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  }
);

const storedProfile = JSON.parse(localStorage.getItem("profile"));

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: storedProfile || null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        localStorage.setItem("profile", JSON.stringify(action.payload));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
