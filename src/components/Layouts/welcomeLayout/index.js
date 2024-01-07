import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

 const WelcomeLayout = () => {
   return <>
            {/* <Box mb="200px" /> */}
   <Outlet />
   </>;
  };
  export default WelcomeLayout;