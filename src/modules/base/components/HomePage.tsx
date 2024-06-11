import {
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const MyContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem 0",
  paddingTop: "6rem",
  height: "100vh",
});

export default function HomePage() {
  
  const navigate = useNavigate();
  return (
    <MyContainer>
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
          onClick={() => {
            navigate("/label");
          }}
        >
          <CardMedia
            component={FontAwesomeIcon}
            icon={faPrint}
            sx={{ fontSize: "10rem" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              In nhãn sách, vở
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </MyContainer>
  );
}
