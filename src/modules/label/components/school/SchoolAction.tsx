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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddCircleOutline, ClearAll } from "@mui/icons-material";
import { useState, useEffect } from "react";
import FormPopup from "../popup/FormPopup";
import ConfirmPopup from "../popup/ConfirmPopup";
import {
  addNewSchool,
  deleteSchool,
  getAllSchools,
  updateSchool,
} from "../../../../services/SchoolService";

export default function SchoolAction() {
  const [schools, setSchools] = useState<any[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [rowSelected, setRowSelected] = useState<any>(0);

  useEffect(() => {
    getAllSchools()
      .then((res) => {
        let data = res.data.data;
        for (let i = 0; i < data.length; i++) {
          data[i].index = i + 1;
        }
        setSchools(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    let newSchool = {
      name: name,
    };
    addNewSchool(newSchool)
      .then((res) => {
        let newSchools = [...schools];
        newSchools.push({
          index: newSchools.length + 1,
          name: name,
        });
        setSchools(newSchools);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenForm(false);
      });
  };

  const updateSubmit = (name: any) => {
    let newSchool = {
      name: name,
    };
    updateSchool(rowSelected, newSchool)
      .then((res) => {
        let newSchools = [...schools];
        newSchools[rowSelected - 1].name = name;
        setSchools(newSchools);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenForm(false);
      });
  };

  const deleteSubmit = (index: any) => {
    deleteSchool(rowSelected)
      .then((res) => {
        let newSchools = schools.filter((school) => school.id !== index);
        newSchools = newSchools.map((school, index) => {
          school.index = index + 1;
          return school;
        });
        setSchools(newSchools);
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
                  width: "10%",
                  fontWeight: "bold",
                }}
              >
                STT
              </TableCell>
              <TableCell
                sx={{
                  width: "70%",
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
            {schools &&
              schools.map((row) => (
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
