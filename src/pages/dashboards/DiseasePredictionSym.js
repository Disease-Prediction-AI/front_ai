import React, { useState, useEffect } from "react";
import Header from "../../components/Headers/PagesHeader";
import {
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  useTheme,
  Tabs,
  Tab,
  Stack,
} from "@mui/material";
import { Tokens } from "../../utils/colors/Colors";
import { useDispatch, useSelector } from "react-redux";
import { predictDisease } from "../../redux-toolkit/predictDisease"; 
import { symptomsList } from "./data/diseaseData"; 

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DiseasePredictionSym = () => {
  const theme = useTheme();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const colors = Tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const diseasePrediction = useSelector((state) => state.diseasePrediction);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSymptoms(typeof value === "string" ? value.split(",") : value);
  };
  const handlClick = async()=>{
    const rep =await dispatch(predictDisease(selectedSymptoms));
    console.log(rep)


  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDelete = (chipToDelete) => () => {
    setSelectedSymptoms((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  useEffect(() => {
    console.log(selectedSymptoms);

  }, [ selectedSymptoms]);

  return (
    <Box>
      <Box margin="20px">
        <Header title="Disease Prediction" subtitle="Welcome to your Doctor" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ margin: "20px" }}
      >
        <Header title={"Disease prediction using Machine Learning"} />
        <Box sx={{ margin: "10px 0" }}>
          <FormControl sx={{ width: 600 }}>
            <Typography color={colors.grey[100]} sx={{ margin: "10px 0 0 0" }}>
              What are your Symptoms ?
            </Typography>
            <Select
  multiple
  displayEmpty
  value={selectedSymptoms}
  onChange={handleChange}
  input={<OutlinedInput />}
  renderValue={(selected) => {
    if (selected.length === 0) {
      return <em>Placeholder</em>;
    }

    return selected.map((s) => (
      <Chip
        key={s}  // Add key prop here
        label={s}
        variant="outlined"
        color="info"
        onDelete={handleDelete(s)}
      />
    ));
  }}
  MenuProps={MenuProps}
  inputProps={{ "aria-label": "Without label" }}
>
  {symptomsList.map((symptom) => (
    <MenuItem key={symptom} value={symptom}>
      {symptom}
    </MenuItem>
  ))}
</Select>

          </FormControl>
        </Box>

        <Button
          sx={{
            backgroundColor: colors.greenAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            marginTop: "20px",
            display: "flex",
            alignContent: "start",
          }}
          onClick={handlClick}

        >
          Predict
        </Button>
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ margin: "20px 0 20px 0" }}
        >
          Disease: {diseasePrediction.disease} with {diseasePrediction.probability}% probability.
        </Typography>
        <Stack spacing={1}>
          <Stack>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                width: 600,
                margin: "0 0 20px 0",
              }}
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab label="Description" />
              <Tab label="Precautions" />
            </Tabs>
          </Stack>
          <Stack>
            {tabValue === 0 && (
              <Box width={600}>
                <Typography textAlign="start">
                  {diseasePrediction.description}
                </Typography>
              </Box>
            )}
            {tabValue === 1 && (
              <Box width={600}>
                {diseasePrediction.precautions.map((precaution, index) => (
                  <Typography key={index} ml="30px" textAlign="start">
                    {precaution}
                  </Typography>
                ))}
              </Box>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default DiseasePredictionSym;
