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

export default function LabelTable({
  subjects,
  setSubjects,
}: {
  subjects: any[];
  setSubjects: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const handleAdd = () => {
    let newSubjects = [...subjects];
    newSubjects.push({
      index: newSubjects.length + 1,
      name: "",
    });
    setSubjects(newSubjects);
  };

  const handleDelete = (index: number) => {
    let newSubjects = subjects.filter((subject) => subject.index !== index);
    newSubjects = newSubjects.map((subject, index) => {
      subject.index = index + 1;
      return subject;
    });
    setSubjects(newSubjects);
  }

  const handleDeleteAll = () => {
    setSubjects([]);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutline />}
          sx={{ mr: 1 }}
          onClick={handleAdd}
        >
          Thêm nhãn vở
        </Button>
        <Button
          variant="contained"
          startIcon={<ClearAll />}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </Button>
      </div>
      <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
        <Table
          sx={{ maxWidth: 500 }}
          aria-label="simple table"
          size="small"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sx={{
                  width: "50px",
                }}
              >
                STT
              </TableCell>
              <TableCell
                sx={{
                  width: "200px",
                }}
                align="left"
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  width: "50px",
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
                  <TableCell align="left">
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={row.name}
                      onChange={(e) => {
                        let newSubjects = [...subjects];
                        newSubjects[row.index - 1].name = e.target.value;
                        setSubjects(newSubjects);
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton>
                      <DeleteIcon onClick={() => handleDelete(row.index)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
