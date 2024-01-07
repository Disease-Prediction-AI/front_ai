import React from 'react';
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import Sidebar, { SidebarItem } from './newsider';


const test = () => {
    
const testData = [
    { icon: <PieChartOutlineOutlinedIcon />, text: "Dashboard", active },
    { icon: <PieChartOutlineOutlinedIcon />, text: "Profile",  alert},
    { icon: <PieChartOutlineOutlinedIcon />, text: "Messages", active: false, alert: true },
    { icon: <PieChartOutlineOutlinedIcon />, text: "Settings", active: false, alert: false },
    { icon: <PieChartOutlineOutlinedIcon />, text: "Logout", active: false, alert: false },
  ];
  
    return (
        <Sidebar>
        {testData.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            active={item.active}
            alert={item.alert}
          />
        ))}
      </Sidebar>
    );
};

export default test;