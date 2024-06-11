import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddCircleOutline, ClearAll } from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
  addNewLabel,
  deleteLabel,
  getLabelsByGrade,
  updateLabel,
} from "../../../../services/LabelService";
import FormPopup from "../popup/FormPopup";
import ConfirmPopup from "../popup/ConfirmPopup";

export default function NotebookAction({ grade }: { grade: any }) {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [rowSelected, setRowSelected] = useState<any>(0);

  useEffect(() => {
    getLabelsByGrade(grade)
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
  }, [grade]);

  const handleAdd = () => {
    setAction("add");
    setOpenForm(true);
  };

  const handleUpdate = (row: any) => {
    setRowSelected(row);
    setAction("edit");
    setOpenForm(true);
  };

  const handleDelete = (row: any) => {
    setRowSelected(row);
    setOpenConfirm(true);
  };

  const addSubmit = (name: any) => {
    let request = {
      grade: grade,
      name: name,
    };

    addNewLabel(request)
      .then((res) => {
        let newSubjects = [...subjects];
        newSubjects.push({
          index: newSubjects.length + 1,
          name: name,
        });
        setSubjects(newSubjects);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenForm(false);
      });
  };

  const updateSubmit = (name: any) => {
    let request = {
      grade: grade,
      name: name,
    };
    updateLabel(rowSelected, request)
      .then((res) => {
        let newSubjects = [...subjects];
        newSubjects[rowSelected - 1].name = name;
        setSubjects(newSubjects);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenForm(false);
      });
  };

  const deleteSubmit = (index: number) => {
    deleteLabel(index)
      .then((res) => {
        let newSubjects = subjects.filter((subject) => subject.id !== index);
        newSubjects = newSubjects.map((subject, index) => {
          subject.index = index + 1;
          return subject;
        });
        setSubjects(newSubjects);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenConfirm(false);
      });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutline />}
          onClick={handleAdd}
        >
          Thêm nhãn vở
        </Button>
      </div>
      <TableContainer component={Paper} sx={{ maxHeight: "85vh" }}>
        <Table
          sx={{ width: "100%" }}
          aria-label="simple table"
          size="small"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sx={{
                  width: "20%",
                  fontWeight: "bold",
                }}
              >
                STT
              </TableCell>
              <TableCell
                sx={{
                  width: "60%",
                  fontWeight: "bold",
                }}
                align="left"
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  width: "20%",
                  fontWeight: "bold",
                }}
                align="center"
              >
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects &&
              subjects.map((row) => (
                <TableRow key={row.id} sx={{ height: "20px" }}>
                  <TableCell align="left" component="th" scope="row">
                    {row.index}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton>
                      <EditIcon onClick={() => handleUpdate(row.id)} />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon onClick={() => handleDelete(row.id)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormPopup
        open={openForm}
        setOpen={setOpenForm}
        submit={(name) => {
          if (action === "add") {
            addSubmit(name);
          }
          if (action === "edit") {
            updateSubmit(name);
          }
        }}
      />
      <ConfirmPopup
        open={openConfirm}
        setOpen={setOpenConfirm}
        submit={() => deleteSubmit(rowSelected)}
      />
    </>
  );
}
