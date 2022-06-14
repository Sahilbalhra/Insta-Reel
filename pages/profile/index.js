import React from "react";
import { Box } from "@mui/material";
import Navbar from "../../components/Navbar";
const index = () => {
  return (
    <>
    <Navbar/>
      <Box component="div" className="main">
        <Box component="div" className="pimg__container">
          <Box
            component="img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBYtcUDQPk3L4xlj7k0OaXUg-fGrr2S7nPZw&usqp=CAU"
            alt=""
            className="pimg"
          />
        </Box>
        <Box component="div" className="details">
          <Box component="div" className="content">
            Name
          </Box>
          <Box component="div" className="content">
            No Of Posts: 0
            <span className="bold_text">Posts</span>
          </Box>
          <Box component="div" className="content">
            Email: <span className="bold_text">email@gamil.com</span>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default index;
