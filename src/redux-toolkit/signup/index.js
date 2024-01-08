import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    try {
      const response = await axios.post(
        "https://ai.redahimmi.tech/api/auth/register",
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const userRegistrerSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) {
          // If the error has a message, store it in the state
          state.error = action.error.message;
        } else if (action.payload) {
          // If the server sent an error response, store it in the state
          state.error = action.payload.message;
        } else {
          // Otherwise, use a generic error message
          state.error = "Registration failed for an unknown reason";
        }
      });
  },
});



export default userRegistrerSlice.reducer;
