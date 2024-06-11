import {
  Container,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { addNewBackground, updateBackground } from "../../../../services/BackgroundService";
import useToastStore from "../../../../store/ToastStore";

const MyTextField = styled(TextField)({
  marginBottom: "1rem",
});
export default function BackgroundAction({
  background,
  setBackground,
}: {
  background: any;
  setBackground: React.Dispatch<React.SetStateAction<any>>;
}) {
  const {setToast} = useToastStore();
  const [image, setImage] = useState<any>(null);
  const handleFileChange = (event: React.ChangeEvent<any>) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      setBackground({ ...background, image: file });
      setImage(URL.createObjectURL(file));
    }
  };

  const handleUploadBackground = () => {
    addNewBackground(background)
      .then((res) => {
        setToast({
          show: true,
          content: "Upload background thành công",
          type: "success",
        });
      })
      .then((err) => {
        setToast({
          show: true,
          content: "Upload background thất bại",
          type: "error",
        });
      });
  };

  const handleUpdateBackground = () => {
    updateBackground(background.id, background)
      .then((res) => {
        setToast({
          show: true,
          content: "Update background thành công",
          type: "success",
        });
      })
      .catch((err) => {
        setToast({
          show: true,
          content: "Update background thất bại",
          type: "error",
        });
      });
  };

  const handleDeleteBackground = () => {
    addNewBackground(background)
      .then((res) => {
        setToast({
          show: true,
          content: "Upload background thành công",
          type: "success",
        });
      })
      .then((err) => {
        setToast({
          show: true,
          content: "Upload background thất bại",
          type: "error",
        });
      });
  };

  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            Thông tin phông nền
          </Typography>
          <MyTextField
            label="id"
            variant="outlined"
            fullWidth
            defaultValue={0}
            value={background.id}
            onChange={(e) =>
              setBackground({ ...background, id: e.target.value })
            }
            disabled
          />
          <MyTextField
            label="Tên"
            variant="outlined"
            fullWidth
            value={background.name}
            onChange={(e) =>
              setBackground({ ...background, name: e.target.value })
            }
            focused={background.name ? true : false}
          />
          <MyTextField
            id="outlined-basic"
            label="Phông nền"
            variant="outlined"
            type="file"
            fullWidth
            focused
            onChange={(e) => handleFileChange(e)}
          />
        </Container>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: "1rem" }}
          onClick={() => {
            handleUploadBackground();
          }}
          fullWidth
        >
          Upload
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ marginBottom: "1rem" }}
          onClick={() => {
            handleUpdateBackground();
          }}
          fullWidth
        >
          Update  
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ marginBottom: "1rem" }}
          onClick={() => {
            handleDeleteBackground();
          }}
          fullWidth
        >
          Delete
        </Button>
        <Container>
          <img src={image} alt="" style={{ width: "100%" }} />
        </Container>
      </CardContent>
    </Card>
  );
}
