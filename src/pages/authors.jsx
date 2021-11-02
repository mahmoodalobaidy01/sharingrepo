import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Authcontext } from "../context/authcontext";
import { useState, useEffect, useContext } from "react";
import api from "./api/axios";
import AuthorForm from "../components/authorform";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@material-ui/core";
import Button from "@mui/material/Button";
import AuthordeleteForm from "../components/authordelete";
const Authors = () => {
  const [authorFormDialogStatus, setAuthorFormDialogStatus] = useState(false);
  const [authorFormDeleteDialogStatus, setauthorFormDeleteDialogStatus] =
    useState(false);
  const [authorToEdit, setauthorToEdit] = useState(undefined);
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState();

  const authProvider = useContext(Authcontext);

  React.useEffect(() => {
    api
      .get("/authors")
      .then(({ data }) => {
        console.log(data, authProvider.user.token);
        setAuthors(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
      <h1>AUTHORS</h1>
      <Button
        color="success"
        type="submit"
        variant="contained"
        onClick={() => {
          setauthorToEdit(null);
          setAuthorFormDialogStatus(true);
        }}
      >
        ADD AUTHOR
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>author</TableCell>
              <TableCell align="right">id</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <TableRow
                key={author.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {author.name}
                </TableCell>
                <TableCell align="right">{author.id}</TableCell>
                <TableCell align="right">{author.name}</TableCell>
                <TableCell align="right">{author.age}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setAuthorFormDialogStatus(true);
                      setauthorToEdit(author);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setauthorFormDeleteDialogStatus(true);
                      setauthorToEdit(author);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {authorFormDialogStatus && (
        <AuthorForm
          open={authorFormDialogStatus}
          author={authorToEdit}
          closeHandler={() => {
            setAuthorFormDialogStatus(false);
            setauthorToEdit(null);
          }}
          submit={(data) => {
            if (authorToEdit) {
              console.log("update");
              console.log(authorToEdit);
              api
                .put(`/authors/${authorToEdit.id}`, {
                  name: data.name,
                  age: data.age,
                  email: data.email,
                  password: data.password,
                })
                .then((response) => {
                  console.log(response.data.id, 1122);
                  let copyauthors = [...authors];

                  const i = copyauthors.findIndex(
                    (obj) => obj.id == authorToEdit.id
                  );

                  copyauthors[i] = response.data;
                  setAuthorFormDialogStatus(false);
                  setauthorToEdit(null);
                  setAuthors(copyauthors);
                })
                .catch((error) => {});
            } else {
              console.log("create");
              api
                .post(`/authors/`, {
                  name: data.name,
                  age: data.age,
                  email: data.email,
                  password: data.password,
                  privilege: 0,
                })
                .then((response) => {
                  console.log(response.data, 125);
                  let copyauthors = [...authors];
                  copyauthors.push(response.data);
                  setAuthorFormDialogStatus(false);
                  setauthorToEdit(null);

                  setAuthors(copyauthors);
                })
                .catch((error) => {});
            }
          }}
        />
      )}
      ,
      {authorFormDeleteDialogStatus &&
        (console.log(authorToEdit.id, "lalalalala"),
        (
          <AuthordeleteForm
            open={authorFormDeleteDialogStatus}
            closeHandler={() => {
              setauthorFormDeleteDialogStatus(false);
              setauthorToEdit(null);
            }}
            submit={(data) => {
              console.log(authorToEdit.id, "nenenen");
              // api
              //   .delete(`/authors/${authorToEdit.id}`)
              //   .then((response) => {
              //     console.log(response.data, 125);
              //   })
              //   .catch((error) => {});
              let copyauthors = [...authors];
              const i = copyauthors.findIndex(
                (obj) => obj.id == authorToEdit.id
              );
              copyauthors.splice(i, 1);
              setAuthorFormDialogStatus(false);
              setauthorToEdit(null);
              console.log(copyauthors);
              setAuthors(copyauthors);
            }}
          />
        ))}
    </div>
  );
};
export default Authors;
