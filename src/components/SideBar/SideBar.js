import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Tokens } from "../../utils/colors/Colors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Oussama from "../../assets/imgs/user.png";
import {
  DISEASEPREDICTIONSYM,
  PNEUMONIADICTION,
} from "../../utils/constants/routeConstants";
import ChatComponent from "../../pages/chatboot/ChatComponent";
import { ChatOutlined } from "@mui/icons-material";
import { useLocalState } from "../../utils/localStorage/CustomLocalStorage";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = Tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

function getUser() {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

const SideBar = () => {
  const theme = useTheme();
  const user = useState(getUser());
  const [jwt, setJwt] = useLocalState("", "jwt");
  const colors = Tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate("");
  const handleLogout = () => {
    setJwt(null);
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: "100vh", // Set the height to 100% of the viewport height
        display: "flex",
        flexDirection: "column",

        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          height: "100%",
          display: "flex",
          flexDirection: "column", // Adjusted to column layout
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        justifyContent: "space-between", // Added justifyContent
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0px",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Welcome
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box mb="70px" />

          {isCollapsed ? (
            <Box mb="50px" />
          ) : (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={Oussama}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {!isCollapsed && (
              <Typography variant="h3" color={colors.grey[300]}>
                Disease Prediction
              </Typography>
            )}
            <Box mb="100px" />

            <Item
              title="Disease Prediction"
              to={DISEASEPREDICTIONSYM}
              icon={<PlayCircleFilledOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="PNEUMONIA DITECTION "
              to={"/dashboard/Pneumonia"}
              icon={<MonitorHeartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Lung Cancer Prediction"
              to="/dashboard/CancerPrediction"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Your Doctor "
              to={"/dashboard/chatboot"}
              icon={<ChatOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            {isCollapsed && <Box mb="50px" />}

            <Box mb="100px" />

            <MenuItem
              icon={<ExitToAppIcon />}
              onClick={handleLogout}
              style={{
                margin: "0px 0 20px 0px",
                color: colors.grey[100],
                justifyContent: "end",
              }}
            >
              {!isCollapsed && (
                <Typography variant="h3" color={colors.redAccent[100]}>
                  Logout
                </Typography>
              )}
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SideBar;
