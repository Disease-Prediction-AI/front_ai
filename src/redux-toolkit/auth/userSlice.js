import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Import Axios library

export const loginUser = createAsyncThunk("user/login", async (userCredentials) => {
  try {
    const response = await axios.post("https://ai.redahimmi.tech/api/auth/authenticate", userCredentials);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user=null;
        state.error=null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error=null;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
