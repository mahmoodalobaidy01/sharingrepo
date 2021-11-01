import { DataGrid } from "@mui/x-data-grid";
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

function createData(name, id, age) {
  return { name, id, age };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Authors = () => {
  const [authorFormDialogStatus, setAuthorFromDialogStatus] = useState(false);
  const [authorToEdit, setauthorToEdit] = useState(undefined);
  const [authors, setAuthors] = useState([]);
  const authProvider = useContext(Authcontext);

  React.useEffect(() => {
    api
      .get("/authors", {
        headers: { Authorization: "Bearer " + authProvider.user.token },
      })
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
        color="primary"
        variant="contained"
        onClick={() => {
          setauthorToEdit(null);
          setAuthorFromDialogStatus(true);
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
                      setAuthorFromDialogStatus(true);
                      setauthorToEdit(author);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton>
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
            setAuthorFromDialogStatus(false);
            setauthorToEdit(null);
          }}
          submit={(data) => {
            if (authorToEdit) {
              console.log("update");
              console.log(data);
            } else {
              console.log("create");
              console.log(data);
            }
          }}
        />
      )}
    </div>
  );
};
export default Authors;
