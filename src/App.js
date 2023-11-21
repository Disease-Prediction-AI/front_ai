import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { RouterProvider } from "react-router";
import MyRoutes from "./components/Rootes";

function App() {
  const darkTheme = createTheme();

  return (
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={MyRoutes} />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
