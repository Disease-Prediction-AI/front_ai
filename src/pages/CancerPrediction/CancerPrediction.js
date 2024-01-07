import React from "react";

import "./CancerPredictionStyle.css";
import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  TextField,
  FilledInput,
  MenuItem,
  Button,
  AlertTitle,
  Alert,
} from "@mui/material";
import { Tokens } from "../../utils/colors/Colors";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { predictLungCancer } from "../../redux-toolkit/CancerPrediction";

const CancerPrediction = () => {

  const dispatch = useDispatch();
  const result = useSelector((state) => state.prediction.result);
  const loading = useSelector((state) => state.prediction.loading);
  const uploadResult = useSelector((state) => state.prediction.uploadResult);
  const theme = useTheme();

  const colors = Tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    name: "oussama",
    gender: "M",
    age: 0,
    anxiety:"NO",
    smoking: "NO",
    yellowFingers: "NO",
    peerPressure: "NO",
    chronicDisease: "NO",
    fatigue: "NO",
    allergy: "NO",
    wheezing: "NO",
    alcoholConsuming: "NO",
    coughing: "NO",
    shortnessOfBreath: "NO",
    swallowingDifficulty: "NO",
    chestPain: "NO",
  });
  const handlePredict = async () => {
    const rep = await dispatch(predictLungCancer(formData));
  const prediction =rep.payload.data.data.prediction.cancer_prediction;
  console.log(formData)
  console.log(prediction)
  
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

  };

  const generateTextField = (label, defaultValue = "No") => (
    <TextField
      sx={{ ml: 2, mr: 2, mt: 2, "& label": { fontSize: "1.2rem" } }}
      id={`filled-select-${label.toLowerCase().replace(/\s/g, "-")}`}
      select
      label={label}
      defaultValue={defaultValue}
      variant="filled"
      value={formData[label]}
      onChange={(e) =>
        handleInputChange(
          label.toLowerCase().replace(/\s/g, ""),
          e.target.value
        )
      }
    >
      <MenuItem value="YES">Yes</MenuItem>
      <MenuItem value="NO">No</MenuItem>
    </TextField>
  );

  return (
    <>
      <div className="section">
        <div className="image"></div>

        <div>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            <FormControl
              fullWidth
              sx={{
                ml: 5,
                mt: 2,
                mr: 5,
                mb: 2,
                "& label": { fontSize: "1rem" },
              }}
              variant="filled"
            >
              <InputLabel htmlFor="">Name</InputLabel>
              <FilledInput
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </FormControl>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr 1fr" },
                gap: 2,
                ml: 3,
                mt: 1,
                mr: 3,
                mb: 1,
                pl: 2,
                pr: 2,
              }}
            >
              <TextField
                sx={{ ml: 2, mr: 2, mt: 2, "& label": { fontSize: "1rem" } }}
                id="filled-select-gender"
                select
                label="Gender"
                defaultValue=""
                variant="filled"
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
              </TextField>
              <TextField
                sx={{ ml: 2, mr: 2, mt: 2, "& label": { fontSize: "1rem" } }}
                label="age"
                type="number"
                variant="filled"
              />

              {generateTextField("Smoking")}
              {generateTextField("Yellow Fingers")}
              {generateTextField("Anxiety")}
              {generateTextField("Peer Presure")}
              {generateTextField("Chronic Disease")}
              {generateTextField("Fatigue")}
              {generateTextField("Allergy")}
              {generateTextField("Wheezing")}
              {generateTextField("Alcohol Cunsuming")}
              {generateTextField("Coughing")}
              {generateTextField("Shortness of Breath")}
              {generateTextField("Swallowing Difficulty")}
              {generateTextField("Chest Pain")}
            </Box>
          </Box>

          <Button
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              ml: "auto",
              mt: "4rem",
              mr: "auto",
              mb: 1,
              display: "flex",
              alignContent: "start",
            }}
            onClick={handlePredict}
          >
            {loading ? "Predicting..." : "Predict Lung Cancer"}
          </Button>
          {uploadResult && (
                <Alert
                severity={uploadResult.cancer_prediction === "NO" ? "success" : "error"}
                sx={{
                  width: "50%",  // Set your desired width
                  backgroundColor: uploadResult.cancer_prediction === "NO"
                    ? colors.greenAccent[700]
                    : colors.redAccent[500],
                  color: colors.grey[100],
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "2rem",  // Adjust the margin-top as needed
                }}
                className="mb-3"
              >
                <AlertTitle>
                  {uploadResult.cancer_prediction === "NO"
                    ? "NORMAL"
                    : "Cancer"}
                </AlertTitle>
                {uploadResult.cancer_prediction === "NO"
                  ? "This is a Negative Result."
                  : "This is a Positive Result."}
              </Alert>
      
      )}
        </div>
      </div>
    </>
  );
};

export default CancerPrediction;
