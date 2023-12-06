import React from "react";

import "./CancerPredictionStyle.css";
import { Box, TextField, MenuItem, InputAdornment } from "@mui/material";

const CancerPrediction = () => {
  const gender = [
    {
      value: "Male",
    },
    {
      label: "Female",
    },
  ];

  return (
    <>
      <div className="container">
        <div className="image"></div>
        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="With normal TextField"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">kg</InputAdornment>
                  ),
                }}
              />
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                defaultValue="EUR"
                helperText="Please select your currency"
              >
                {gender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default CancerPrediction;
