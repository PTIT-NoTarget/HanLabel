import { Container, Grid, Tabs, Box, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import LabelHomePage from "./home/LabelHomePage";
import SchoolPage from "./school/SchoolPage";
import NotebookPage from "./notebook/NotebookPage";
import BackgroundPage from "./background/BackgroundPage";

const MyContainer = styled(Container)({
  padding: "1rem 0",
  paddingTop: "6rem",
  height: "100vh",
  width: "100%",
});

export default function LabelPage() {
  const [tab, setTab] = useState<number>(0);
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
              value={tab}
              onChange={(e, value) => setTab(value)}
              sx={{ borderRight: 1, borderColor: "divider", width: "100%"}}
            >
              <Tab label="Trang chủ" />
              <Tab label="Trường học" />
              <Tab label="Nhãn vỡ" />
              <Tab label="Phông nền" />
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={10}>
          {tab === 0 && <LabelHomePage />}
          {tab === 1 && <SchoolPage />}
          {tab === 2 && <NotebookPage />}
          {tab === 3 && <BackgroundPage />}
        </Grid>
      </Grid>
    </MyContainer>
  );
}
