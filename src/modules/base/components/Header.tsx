import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AppBar, Box, Container, Typography } from "@mui/material";

const MyContainer = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 0",
});
export default function Header() {
  const navigate = useNavigate();
  let time = new Date().toLocaleTimeString();
  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);
  return (
    <Box>
      <AppBar component="nav">
        <MyContainer>
          <MenuItem
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography variant="h4" textAlign="center">
              Han Label
            </Typography>
          </MenuItem>
          <Typography variant="h6" component="div">
            {ctime}
          </Typography>
        </MyContainer>
      </AppBar>
    </Box>
  );
}
