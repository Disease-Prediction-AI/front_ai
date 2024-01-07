import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create async thunk to handle image upload
export const uploadImage = createAsyncThunk(
  "pneumonia/uploadImage",
  async (formData) => {
    try {
      const response = await axios.post("http://localhost:8080/api/pneumonia/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const pneumoniaSlice = createSlice({
  name: "pneumonia",
  initialState: {
    loading: false,
    error: null,
    uploadResult: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadResult = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadResult = action.payload.data ? action.payload.data.prediction : null;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});



export const selectPneumonia = (state) => state.pneumonia;

export default pneumoniaSlice.reducer;
