import React from "react";

import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginStyle.css";
import {
  TextField,
  Button,
  FormLabel,
  Checkbox,
  useTheme,
  IconButton,
  Box
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ColorModeContext } from "../../theme";

const Login = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();
  const [concept, setconcept] = useState("");

  useEffect(() => {
    setconcept(theme.palette.mode === 'dark' ? 'dark' : 'light');
  }, [theme.palette.mode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPassword(true);
    }

    console.log(email, password);

    // Redirect to the Dashboard
    navigate("../dashboard");
  };


  return (
    <>
      <div className="main" 
      >
        <div className={`left ${concept}`}>
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
        <div className="right">
          <form className="form" autoComplete="off" onSubmit={handleSubmit}>
            <h2>Login</h2>
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
            <FormLabel>
              <Checkbox color="secondary" />
              Remember me
            </FormLabel>
            <br />
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
            <br />
            <br />
            <div className="links">
              <FormLabel className="link1">Forgot password</FormLabel>
              <Link to="../Registration">
                <FormLabel className="link2">
                  Dont have an account? Sign Up
                </FormLabel>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
