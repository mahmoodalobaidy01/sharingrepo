import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
const AuthorForm = (props) => {
  const [name, setName] = useState(props?.author?.name ?? "");
  const [age, setAge] = useState(props?.author?.age ?? 1);
  const [password, setPassword] = useState(props?.author?.password ?? "");
  const [email, setEmail] = useState(props?.author?.email ?? "");
  const [error, setErrors] = useState([]);
  const check = () => {
    if (
      name == "" ||
      name.length < 3 ||
      password == "" ||
      password.length < 8 ||
      age < 15 ||
      email == "" ||
      email.length < 8
    ) {
      return true;
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!check()) {
      setErrors(null);
    } else {
      return;
    }

    props.submit({
      name,
      age,
      email,
      password,
    });
  };
  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={(props.closeHandler, props.submit)}
    >
      <DialogTitle id="form-dialog-title">
        {props.author ? "edit author" : "add author"}
      </DialogTitle>
      <form onSubmit={submitHandler}>
        <DialogContent>
          <TextField
            autoFocus
            name="name"
            id="name"
            label="name"
            type="text"
            margin="dense"
            value={name}
            error={name == "" || name.length < 3 ? error : null}
            onChange={(e) => setName(e.target.value)}
            enabled="false"
          />
          <TextField
            name="age"
            id="age"
            label="age"
            type="number"
            min="15"
            margin="dense"
            value={age}
            error={age < 15 ? error : null}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            name="email"
            id="email"
            label="email"
            type="text"
            margin="dense"
            value={email}
            error={email == "" || email.length < 8 ? error : null}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            name="password"
            id="password"
            label="password"
            type="text"
            margin="dense"
            error={password == "" || password.length < 8 ? error : null}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeHandler} color="primary">
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
export default AuthorForm;
