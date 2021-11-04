import {
  FETCH_DATA,
  FETCHING_DATA_SUCCESSFUL,
  FETCHING_DATA_FALURE,
  ADD_AUTHOR,
  OPEN_ADD_AUTHOR,
  EDIT_AUTHOR,
  OPEN_EDIT_AUTHOR,
  DELETE_AUTHOR,
  OPEN_DELETE_AUTHOR,
  CLOSE_AUTHOR_FORM,
  CLOSE_DELETE_DIALOG,
} from "./author-action";
export const initState = {
  authors: [],
  authorFormDialogStatus: false,
  setAuthorDeleteDialogStatus: false,
  authorToEdit: null,
  AuthorDeleteId: null,
  isloading: false,
  error: "",
};
export const authorReduce = (state = initState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        isloading: true,
      };
    case FETCHING_DATA_SUCCESSFUL:
      return {
        ...state,
        authors: action.payload,
        isloading: true,
      };
    case ADD_AUTHOR:
      return {
        ...state,
        authorToEdit: null,
        authors: action.payload,
      };
    case OPEN_ADD_AUTHOR:
      return {
        ...state,
        authorToEdit: null,
        authorFormDialogStatus: true,
      };
    case OPEN_EDIT_AUTHOR:
      return {
        ...state,
        authorToEdit: action.payload,
        authorFormDialogStatus: true,
      };
    case CLOSE_AUTHOR_FORM:
      return {
        ...state,
        authorToEdit: null,
        authorFormDialogStatus: false,
      };
    case EDIT_AUTHOR:
      return {
        ...state,
        authors: action.payload,
        authorFormDialogStatus: false,
        authorToEdit: null,
      };
    case DELETE_AUTHOR:
      return {
        ...state,
        authorToEdit: null,
        authorFormDeleteDialogStatus: false,
        authors: action.payload,
      };
    case OPEN_DELETE_AUTHOR:
      return {
        ...state,
        authorFormDeleteDialogStatus: true,
        authorToEdit: action.payload,
      };
    case CLOSE_DELETE_DIALOG:
      return {
        ...state,
        authorFormDeleteDialogStatus: false,
        authorToEdit: null,
      };
    case OPEN_DELETE_AUTHOR:
      return {
        ...state,
        authorFormDeleteDialogStatus: true,
        authorToEdit: action.payload,
      };
    default:
      return state;
  }
};
