import React from "react";
import { useState, useContext, useEffect } from "react";
import "./RegistrationStyle.css";
import { Link, useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {
  TextField,
  Button,
  FormLabel,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import { ColorModeContext } from "../../theme";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux-toolkit/signup";
import { useLocalState } from "../../utils/localStorage/CustomLocalStorage";

const Registration = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstNameError, setfirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();
  const [concept, setconcept] = useState("");

  useEffect(() => {
    setconcept(theme.palette.mode === 'dark' ? 'dark' : 'light');
  }, [theme.palette.mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setEmailError(false);
    setPasswordError(false);
  
    if (firstName === "") {
      setfirstNameError(true);
    }
    if (lastName === "") {
      setLastNameError(true);
    }
    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
  
    try {
      const registrationData = {
        firstName,
        lastName,
        email,
        password,
      };
  
      // Dispatch the registration action
      const rep = await dispatch(registerUser(registrationData));
      console.log(rep);
  
      // Check if registration was successful
      if (rep.payload && rep.payload.statusCode === 201) {
        const token = rep.payload.data.token;
  
        // Save the token to your preferred storage (e.g., localStorage, cookies)
        setJwt(token);
  
        // Redirect to the Dashboard
        navigate("../dashboard");
      } else {
        // Handle unsuccessful registration
        // You can access error information from rep.payload.message
        console.error("Registration failed:", rep.payload.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration failure (e.g., display an error message)
    }
  };
  
  return (
    <>
      <div className="main">
        <div className={`right ${concept}`}>
          <Box display="flex" borderRadius="3px">
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
          </Box>
        </div>
        <div className="left">
          <form className="form" autoComplete="off" onSubmit={handleSubmit}>
            <h2>Registration</h2>
            <TextField
              className="firstName"
              label="First Name"
              required
              variant="outlined"
              color="secondary"
              type="text"
              value={firstName}
              error={firstNameError}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ mb: 3 }}
              fullWidth
            />
            <TextField
              className="lastName"
              label="Last Name"
              required
              variant="outlined"
              color="secondary"
              type="text"
              value={lastName}
              error={lastNameError}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ mb: 3 }}
              fullWidth
            />
            <TextField
              label="Email"
              required
              variant="outlined"
              color="secondary"
              type="email"
              value={email}
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              fullWidth
            />
            <TextField
              label="Password"
              required
              variant="outlined"
              color="secondary"
              type="password"
              value={password}
              error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
            />
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              fullWidth
            >
              Sign Up
            </Button>
            <br />
            <br />
            <div className="links">
              <Link to="../Login">
                <FormLabel className="link2">
                  Already have an account? SignIn
                </FormLabel>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
