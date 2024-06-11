import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";

export default function FormPopup({
  open,
  setOpen,
  submit,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  submit: (name: any) => void;
}) {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if(!open) {
      setName("");
    }
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            submit(name);
          },
        }}
      >
        <DialogTitle width={500}> Nhập thông in </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginBottom: 2, marginTop: 2}}
            autoFocus
            required
            label="name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Hủy
          </Button>
          <Button type="submit" variant="contained">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
