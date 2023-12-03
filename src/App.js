import { CssBaseline,ThemeProvider } from "@mui/material";

import { RouterProvider } from "react-router";
import MyRoutes from "./components/Rootes";
import { ColorModeContext,useMode } from "./theme";

function App() {
  const [theme,colorMode]=useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>

    <ThemeProvider theme={theme}>
      <RouterProvider router={MyRoutes} />
      <CssBaseline />
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
