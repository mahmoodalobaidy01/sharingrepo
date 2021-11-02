import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { useState } from "react";
const name = "mm";
const AuthordeleteForm = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();

    props.submit({
      name,
    });
  };
  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={(props.closeHandler, props.submit)}
    >
      <DialogTitle id="form-dialog-title" color="red">
        {"Delete Author"}
      </DialogTitle>
      <form onSubmit={submitHandler}>
        <DialogContent>
          You are going to delete this author from your database !! Are you
          sure???
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeHandler} color="secondary">
            Cancel
          </Button>
          <Button type="submit" onClick={submitHandler} color="primary">
            submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default AuthordeleteForm;
