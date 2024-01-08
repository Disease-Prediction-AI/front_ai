import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  error: null,
  prediction: null,
};

export const predictLungCancer = createAsyncThunk(
  'prediction/predictLungCancer',
  async (patientInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://ai.redahimmi.tech/api/lung-cancer/predict', patientInfo);
      return response
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const predictionSlice = createSlice({
  name: 'prediction',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(predictLungCancer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadResult = null;
      })
      .addCase(predictLungCancer.fulfilled, (state, action) => {
        state.loading = false;
        state.prediction = action.payload;
        state.uploadResult = action.payload.data.data ? action.payload.data.data.prediction : null;

      })
      .addCase(predictLungCancer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      });
  },
});


// Export the reducer for use in the store
export default predictionSlice.reducer;
