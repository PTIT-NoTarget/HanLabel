import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect, useRef } from "react";
import BackgroundSelection from "../home/BackgroundSelection";
import BackgroundAction from "./BackgroundAction";

const MyContainer = styled(Container)({
  height: "100%",
  width: "100%",
});

export default function BackgroundPage() {
  const [background, setBackground] = useState<string>("");
  return (
    <MyContainer>
      <Grid container spacing={2}>
      <Grid item xs={6}>
          <BackgroundAction
            background={background}
            setBackground={setBackground}
          />
        </Grid>
        <Grid item xs={6}>
          <BackgroundSelection
            background={background}
            setBackground={setBackground}
          />
        </Grid>
      </Grid>
    </MyContainer>
  );
}