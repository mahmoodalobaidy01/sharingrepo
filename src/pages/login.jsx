import React from "react";
import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Authcontext } from "../context/authcontext";
import api from "./api/axios";
import { fontWeight } from "@mui/system";
import { useHistory } from "react-router-dom";
//import Form from "@mui/material/Form";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { isAuth, login } = useContext(Authcontext);
  const history = useHistory();
  const setemail = (email) => {
    setEmail(email);
  };
  const setpassword = (password) => {
    setPassword(password);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    const errors = validationform();
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    api
      .post(`/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        setErrors("");
        login(response.data);
        console.log(response.data);
        history.push("/authors");
      })
      .catch((error) => {});
  };
  const validationform = () => {
    const errors = [];
    if (email.length === 0) {
      errors.push("Email is required");
    }
    if (password.length === 0) {
      errors.push("Password is required");
    }
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }
    return errors;
  };

  return (
    <form className="logPage" onSubmit={handlesubmit}>
      <div>
        <h1 style={{ fontfamily: "" }}>LOGIN</h1>
        <br />
        <TextField
          label="Email"
          color="primary"
          focused
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <br />
        <br />
        <br />
        <br />

        <TextField
          label="password"
          color="secondary"
          focused
          value={password}
          onChange={(p) => {
            setpassword(p.target.value);
          }}
          type="password"
        />
        <br />
        <br />
        <br />

        <Button variant="contained" color="success" type="submit">
          LOGIN
        </Button>
        <br />
        <br />
        <br />

        <Button variant="contained" style={{ color: "primary" }} type="logout">
          logout
        </Button>
      </div>
      {errors && (
        <p style={{ color: "red", fontWeight: "bolder" }}>
          {" "}
          {errors.join("\n\n\n")}
        </p>
      )}
    </form>
  );
};
export default Login;
