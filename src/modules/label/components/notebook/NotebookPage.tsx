import { Container, Grid, Box, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import NotebookAction from "./NotebookAction";
import { useState } from "react";

const MyContainer = styled(Container)({
  height: "100%",
  width: "100%",
});

export default function NotebookPage() {
  const [grade, setGrade] = useState<any>(1);
  return (
    <MyContainer maxWidth="xl">
      <Grid container>
        <Grid item xs={2}>
          <Box
            sx={{
              bgcolor: "background.paper",
              display: "flex",
              height: "100%",
              width: "100%",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={grade - 1}
              onChange={(e, value) => setGrade(value + 1)}
              sx={{ borderRight: 1, borderColor: "divider", width: "100%"}}
            >
              <Tab label="Lớp 1" />
              <Tab label="Lớp 2" />
              <Tab label="Lớp 3" />
              <Tab label="Lớp 4" />
              <Tab label="Lớp 5" />
              <Tab label="Lớp 6" />
              <Tab label="Lớp 7" />
              <Tab label="Lớp 8" />
              <Tab label="Lớp 9" />
              <Tab label="Lớp 10" />
              <Tab label="Lớp 11" />
              <Tab label="Lớp 12" />
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <NotebookAction grade={grade} />
        </Grid>
      </Grid>
    </MyContainer>
  );
}