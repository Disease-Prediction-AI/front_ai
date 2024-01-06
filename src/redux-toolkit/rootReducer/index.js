import { combineReducers } from "@reduxjs/toolkit";

import pneumoniaReducer from "../upload-imgs/uploadImgSlice";
import userReducer from "../auth/userSlice";
import diseasePredictionReducer from "../predictDisease"

const rootReducer = combineReducers({
  user: userReducer,
  pneumonia: pneumoniaReducer,
  diseasePrediction: diseasePredictionReducer,

});

export default rootReducer;
