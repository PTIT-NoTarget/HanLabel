import {
  Container,
  Grid,
  TextField,
  Autocomplete,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getAllSchools } from "../../../../services/SchoolService";

const MyTextField = styled(TextField)({
  marginBottom: "1rem",
});

export default function FormPrint({
  infor,
  setInfor,
}: {
  infor: any;
  setInfor: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [schools, setSchools] = useState<any[]>([]);
  useEffect(() => {
    getAllSchools().then((res) => {
      setSchools(res.data.data);
    });
  }, []);
  return (
    <Container>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Thông tin học sinh
      </Typography>
      <Autocomplete
        openOnFocus
        options={schools ? schools.map((school) => school.name) : []}
        renderInput={(params) => <MyTextField {...params} label="Trường" />}
        fullWidth
        onChange={(e, value) => {
          console.log(value);
          setInfor({ ...infor, school: value });
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Autocomplete
            openOnFocus
            options={Array.from({ length: 12 }, (_, i) => `${i + 1}`)}
            renderInput={(params) => <MyTextField {...params} label="Lớp" />}
            fullWidth
            onChange={(e, value) => setInfor({ ...infor, grade: value })}
          />
        </Grid>
        <Grid item xs={6}>
          <MyTextField
            id="outlined-basic"
            label="Hậu tố"
            variant="outlined"
            fullWidth
            value={infor.suffix}
            onChange={(e) => setInfor({ ...infor, suffix: e.target.value })}
          />
        </Grid>
      </Grid>
      <MyTextField
        id="outlined-basic"
        label="Họ và tên"
        variant="outlined"
        fullWidth
        value={infor.name}
        onChange={(e) => setInfor({ ...infor, name: e.target.value })}
      />
      <MyTextField
        id="outlined-basic"
        label="Năm học"
        variant="outlined"
        fullWidth
        defaultValue={
          new Date().getFullYear() - 1 + " - " + new Date().getFullYear()
        }
        value={infor.year}
        onChange={(e) => setInfor({ ...infor, year: e.target.value })}
        disabled
      />
      <FormGroup sx={{ marginBottom: "1rem" }}>
        <Grid container>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={infor.book}
                  onChange={(e) =>
                    setInfor({ ...infor, book: e.target.checked })
                  }
                />
              }
              label="Sách"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={infor.notebook}
                  onChange={(e) =>
                    setInfor({ ...infor, notebook: e.target.checked })
                  }
                />
              }
              label="Vở"
            />
          </Grid>
        </Grid>
      </FormGroup>
    </Container>
  );
}
