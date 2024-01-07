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
  Box,
  Alert,
  AlertTitle,
  Stack,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ColorModeContext } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux-toolkit/auth/userSlice";
import { useLocalState } from "../../utils/localStorage/CustomLocalStorage";

const Login = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const theme = useTheme();
  const dispatch = useDispatch();

  const colorMode = useContext(ColorModeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [concept, setconcept] = useState("");
  // Reedux State
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    setconcept(theme.palette.mode === "dark" ? "dark" : "light");
  }, [theme.palette.mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userCredential = { email, password };

    try {
      const rep = await dispatch(loginUser(userCredential));
      console.log(rep.payload.token);
      const token = rep.payload.token;

      // Check the response or navigate based on the logic you need
      if (rep.payload) {
        setJwt(token);
        navigate("dashboard/DiseasePredictionBySym");
      } else {
        // Handle unsuccessful login
        // You can access error information from rep.error
      }
    } catch (error) {
      // Handle any errors during dispatch
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="main">
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
              {loading ? "Loading..." : "Login"}
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
            {error && (
                  <Stack sx={{ width: '100%',  mt:5}} spacing={2}>

              <Alert severity="error" sx={{ mt: 20}}>
                <AlertTitle>Error</AlertTitle>
                {
"Acces denied  ! Invalid Credentials"                }
              </Alert>
              </Stack>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
