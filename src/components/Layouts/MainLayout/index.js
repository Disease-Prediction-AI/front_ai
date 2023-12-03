import { Outlet } from "react-router-dom";
import SideBar from "../../SideBar/SideBar";
import NavBar from "../../Navbar/NavBar";
import { CssBaseline } from "@mui/material";
import { useState } from "react";

const DashRoutes = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <CssBaseline />
      <div className="app">
      <SideBar isSidebar={isSidebar} />

        <main className="content">
        <NavBar setIsSidebar={setIsSidebar} />


          <Outlet />
        </main>
      </div>
    </>
  );
};
export default DashRoutes;
