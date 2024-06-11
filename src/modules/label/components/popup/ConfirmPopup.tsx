import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmPopup({
  open,
  setOpen,
  submit,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  submit: () => void;
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            submit();
          },
        }}
      >
        <DialogTitle>Bạn đã chắc chắn sẽ xóa hay chưa ?</DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>Hủy</Button>
          <Button type="submit" color="error">Xóa</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
