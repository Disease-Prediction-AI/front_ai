import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const predictDisease = createAsyncThunk(
  "diseasePrediction/predict",
  async (data) => {
    try {
      const response = await axios.post(
        "https://ai.redahimmi.tech/api/symptoms/diagnose",
        {
          symptoms: data,
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const diseasePredictionSlice = createSlice({
  name: "diseasePrediction",
  initialState: {
    loading: false,
    disease: null,
    probability: 0,
    description: "",
    precautions: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(predictDisease.pending, (state) => {
        state.loading = true;
        state.disease = null;
        state.probability = 0;
        state.description = "";
        state.precautions = [];
        state.error = null;
      })
      .addCase(predictDisease.fulfilled, (state, action) => {
        state.loading = false;
        state.disease = action.payload.disease;
        state.probability = action.payload.probability;
        state.description = action.payload.description;
        state.precautions = action.payload.precautions;
        state.error = null;
      })
      .addCase(predictDisease.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default diseasePredictionSlice.reducer;
