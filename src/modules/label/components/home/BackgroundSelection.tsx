import * as React from "react";
import { ImageList, ImageListItem } from "@mui/material";
import { getAllBackgrounds } from "../../../../services/BackgroundService";

export default function PdfView({
  background,
  setBackground,
}: {
  background: string;
  setBackground: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [backgrounds, setBackgrounds] = React.useState<any[]>([]);
  const [selectedBackground, setSelectedBackground] =
    React.useState<string>("");

  React.useEffect(() => {
    getAllBackgrounds()
      .then((res) => {
        setBackgrounds(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ImageList sx={{ height: "85vh", width: "100%" }} cols={1} gap={10}>
      {backgrounds.map((item) => (
        <ImageListItem
          key={item.id}
          onClick={() => {
            setBackground(item);
            setSelectedBackground(item.url);
          }}
          sx={{
            cursor: "pointer",
            border: selectedBackground === item.url ? "5px solid blue" : "5px solid white",
          }}
        >
          <img
            src={item.url}
            alt={item.name}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
