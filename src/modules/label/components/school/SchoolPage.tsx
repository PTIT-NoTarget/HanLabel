import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import SchoolAction from "./SchoolAction";

const MyContainer = styled(Container)({
  height: "100%",
  width: "100%",
});

export default function SchoolPage() {
  return (
    <MyContainer>
      <SchoolAction/>
    </MyContainer>
  );
}