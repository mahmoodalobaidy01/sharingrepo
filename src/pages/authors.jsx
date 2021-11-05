import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { Authcontext } from "../context/authcontext";
import { useEffect, useContext } from "react";
import api from "./api/axios";
import AuthorForm from "../components/authorform";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@material-ui/core";
import Button from "@mui/material/Button";
import AuthordeleteForm from "../components/authordelete";
import { useReducer } from "react";
import { initState, authorReduce } from "../store/author/author-reducer";
import {
  OPEN_EDIT_AUTHOR,
  OPEN_ADD_AUTHOR,
  OPEN_DELETE_AUTHOR,
  CLOSE_AUTHOR_FORM,
  CLOSE_DELETE_DIALOG,
  FETCHING_DATA_SUCCESSFUL,
  ADD_AUTHOR,
} from "../store/author/author-action";

const Authors = () => {
  const [state, dispatch] = useReducer(authorReduce, initState);

  const authProvider = useContext(Authcontext);

  useEffect(() => {
    api
      .get("/authors")
      .then(({ data }) => {
        // console.log(data);
        // console.log(data, authProvider.user.token);
        dispatch({
          type: FETCHING_DATA_SUCCESSFUL,
          payload: data,
        });
        console.log(4444, state);
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
          dispatch({
            type: OPEN_ADD_AUTHOR,
          });
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
            {state.authors.map((author) => (
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
                      dispatch({
                        type: OPEN_EDIT_AUTHOR,
                        payload: author,
                      });
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      dispatch({
                        type: OPEN_DELETE_AUTHOR,
                        payload: author,
                      });
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
      {state.authorFormDialogStatus && (
        <AuthorForm
          open={state.authorFormDialogStatus}
          author={state.authorToEdit}
          closeHandler={() => {
            dispatch({
              type: CLOSE_AUTHOR_FORM,
              //payload:  copyauthors,
            });
          }}
          submit={(data) => {
            if (state.authorToEdit) {
              console.log("update");
              // console.log(authorToEdit);
              api
                .put(`/authors/${state.authorToEdit.id}`, {
                  name: data.name,
                  age: data.age,
                  email: data.email,
                  password: data.password,
                })
                .then((response) => {
                  // console.log(response.data.id, 1122);
                  let copyauthors = [...state.authors];

                  const i = copyauthors.findIndex(
                    (obj) => obj.id == state.authorToEdit.id
                  );

                  copyauthors[i] = response.data;

                  dispatch({
                    type: CLOSE_AUTHOR_FORM,
                    //payload:  copyauthors,
                  });

                  dispatch({
                    type: FETCHING_DATA_SUCCESSFUL,
                    payload: copyauthors,
                  });
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
                  // console.log(response.data, 125);
                  let copyauthors = [...state.authors];
                  copyauthors.push(response.data);
                  dispatch({
                    type: CLOSE_AUTHOR_FORM,
                    //payload:  copyauthors,
                  });

                  dispatch({
                    type: FETCHING_DATA_SUCCESSFUL,
                    payload: copyauthors,
                  });
                })
                .catch((error) => {});
            }
          }}
        />
      )}
      ,
      {state.authorFormDeleteDialogStatus && (
        <AuthordeleteForm
          open={state.authorFormDeleteDialogStatus}
          closeHandler={() => {
            dispatch({
              type: CLOSE_DELETE_DIALOG,
            });
          }}
          submit={(data) => {
            // console.log(authorToEdit.id, "nenenen");
            api
              .delete(`/authors/${state.authorToEdit.id}`)
              .then((response) => {
                // console.log(response.data, 125);
                let copyauthors = [...state.authors];
                const i = copyauthors.findIndex(
                  (obj) => obj.id == state.authorToEdit.id
                );
                copyauthors.splice(i, 1);
                dispatch({
                  type: CLOSE_DELETE_DIALOG,
                });
                // setauthorFormDeleteDialogStatus(false);
                // setauthorToEdit(null);
                dispatch({
                  type: ADD_AUTHOR,
                  payload: copyauthors,
                });
              })
              .catch((error) => {});
          }}
        />
      )}
    </div>
  );
};
export default Authors;
