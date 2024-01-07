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
} from "@mui/material";
import { Tokens } from "../../utils/colors/Colors";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { predictLungCancer } from "../../redux-toolkit/CancerPrediction";

const CancerPrediction = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const prediction = useSelector((state) => state.prediction.prediction);
  const loading = useSelector((state) => state.prediction.loading);
  const error = useSelector((state) => state.prediction.error);

  const colors = Tokens(theme.palette.mode);
  const handlePredictLungCancer = () => {
    const rep = dispatch(predictLungCancer(formData));
    console.log(rep);
  };

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: 0,
    smoking: "",
    YellowFingers: "",
    PeerPresure: "",
    ChronicDisease: "",
    Fatigue: "",
    Allergy: "",
    Wheezing: "",
    AlcoholCunsuming: "",
    Coughing: "",
    ShortnessBreath: "",
    SwallowingDifficulty: "",
    ChestPain: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    console.log(field, value);
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
      <MenuItem value="Yes">Yes</MenuItem>
      <MenuItem value="No">No</MenuItem>
    </TextField>
  );

  return (
    <>
      <div className="container">
        <div className="image"></div>

        <div>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
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
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
              <TextField
                sx={{ ml: 2, mr: 2, mt: 2, "& label": { fontSize: "1rem" } }}
                label="age"
                type="number"
                variant="filled"
              />

              {generateTextField("Smoking")}
              {generateTextField("Yellow Fingersz")}
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
              ml: 5,
              mt: 1,
              mr: 5,
              mb: 1,
              display: "flex",
              alignContent: "start",
            }}
            onClick={handlePredictLungCancer}
          >
            Predict Lung Cancer
          </Button>
        </div>
      </div>
    </>
  );
};

export default CancerPrediction;
