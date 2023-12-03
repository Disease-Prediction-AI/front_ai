import React, { useState } from "react";
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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const DiseasePridictionSym = () => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const colors = Tokens(theme.palette.mode);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleDelete = (chipToDelete) => () => {
    setTabValue((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

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
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Placeholder</em>;
                }

                return selected.map((s) => (
                  <Chip
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
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
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
        >
          Predict
        </Button>
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ margin: "20px 0 20px 0" }}
        >
          Disease: Typhoid With {ITEM_HEIGHT} % probability.
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
                  Now we have devised robots that are much more complicated than
                  any other machines we have ever had. They are complicated
                  enough to do jobs that until now only human beings could do,
                  but that are too simple for the marvellous brains we all have.
                  The robots, even though they are smarter than other machines,
                  are still only capable of very simple tasks - the kind of
                  tasks human beings ought not to waste their time doing. In
                  that case, why not let the robots do it? Why shouldn't human
                  beings do other and better things? After all, whenever there
                  is an important new invention, some jobs are lost. When the
                  automobile came into use, there was a gradual, but steady,
                  loss of jobs that involved horses.
                </Typography>
              </Box>
            )}
            {tabValue === 1 && (
              <Box width={600}>
                  <Typography ml="30px" textAlign="start">
                  1 . Now we have devised robots
                </Typography>
                  <Typography ml="30px" textAlign="start">
                  2 . Now we have devised robots
                </Typography>
                <Typography ml="30px" textAlign="start">
                  3 . Now we have devised robots
                </Typography>
              </Box>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default DiseasePridictionSym;
