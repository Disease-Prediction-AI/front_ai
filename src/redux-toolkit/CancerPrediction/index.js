// predictionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  loading: false,
  error: null,
  prediction: null,
};

// Define an async thunk for making the API request
export const predictLungCancer = createAsyncThunk(
  'prediction/predictLungCancer',
  async (patientInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/lung-cancer/predict', patientInfo);
      return response.data.data.prediction.cancerPrediction;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create a slice of the Redux store
const predictionSlice = createSlice({
  name: 'prediction',
  initialState,
  reducers: {}, // You don't have any reducers here, so this block can be omitted
  extraReducers: (builder) => {
    builder
      .addCase(predictLungCancer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(predictLungCancer.fulfilled, (state, action) => {
        state.loading = false;
        state.prediction = action.payload;
      })
      .addCase(predictLungCancer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


// Export the reducer for use in the store
export default predictionSlice.reducer;
