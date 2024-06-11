import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  Button,
  ButtonGroup,
  Box,
  LinearProgress,
} from "@mui/material";
import FormPrint from "./FormPrint";
import LabelTable from "./LabelTable";
import { getLabelsByGrade } from "../../../../services/LabelService";
import { renderPdf } from "../../../../services/LabelService";
export default function Infomation({ background }: { background: any }) {
  const pdfRef = useRef<HTMLIFrameElement>(null);
  const [infor, setInfor] = useState<any>({
    year: new Date().getFullYear() - 1 + " - " + new Date().getFullYear(),
    grade: "",
    name: "",
    suffix: "",
    school: "",
    book: false,
    notebook: false,
  });
  const [subjects, setSubjects] = useState<any[]>([]);
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    if (infor.grade !== "") {
      getLabelsByGrade(infor.grade)
        .then((res) => {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            data[i].index = i + 1;
          }
          setSubjects(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [infor.grade]);

  const normalizeName = (name: string) => {
    return name
      .toLowerCase()
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handPrint = () => {
    const timeout = setInterval(() => {
      setProgress((prev) => {
        if (prev > 95) {
          clearInterval(timeout);
          return 90;
        }
        return prev + 2;
      });
    }, 100);
    let request = {
      data: {
        school: infor.school.toUpperCase(),
        name: normalizeName(infor.name),
        year: infor.year,
        class: infor.grade + infor.suffix.toUpperCase(),
        background: {
          type: "url",
          data: background.url,
        },
      },
      labels: subjects,
      book: infor.book,
      notebook: infor.notebook,
    };
    renderPdf(request)
      .then((res) => {
        clearInterval(timeout);
        setProgress(100);
        const pdfBlob = new Blob([res.data], { type: "application/PDF" });
        const blobUrl = window.URL.createObjectURL(pdfBlob);
        const iframe = pdfRef.current;
        if (iframe) {
          iframe.src = blobUrl;
          iframe.onload = () => {
            iframe.contentWindow?.print();
            URL.revokeObjectURL(blobUrl);
          };
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setProgress(0);
      });
  };

  return (
    <Card>
      <CardContent>
        <FormPrint infor={infor} setInfor={setInfor} />
        <Button
          color="primary"
          variant="contained"
          onClick={handPrint}
          fullWidth
        >
          In
        </Button>
        <LinearProgress
          color="error"
          variant="determinate"
          value={progress}
          sx={{ marginBottom: "1rem" }}
        />
        <LabelTable subjects={subjects} setSubjects={setSubjects} />
      </CardContent>
      <iframe ref={pdfRef} title="In nội dung" style={{ display: "none" }} />
    </Card>
  );
}
