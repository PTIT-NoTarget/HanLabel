import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Information from "./Information";
import BackgroundSelection from "./BackgroundSelection";
import { useState } from "react";

const MyContainer = styled(Container)({
  height: "100%",
  width: "100%",
});

export default function LabelHomePage() {
  const [background, setBackground] = useState<any>({});
  return (
    <MyContainer>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Information background={background} />
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
