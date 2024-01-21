import { toast } from "react-toastify";
import {
  createBook,
  deleteBook,
  getAllBook,
  updateBook,
} from "../../helpers/axiosHelper";
import { setBooks, setSelectedBook } from "./bookSlice";

// getting 1 book that was clicked
export const getSelectedBookAction = (_id) => async (dispatch) => {
  const { status, message, books } = await getAllBook(_id);
  if (status === "success") {
    dispatch(setSelectedBook(books));
  }
};

// getting all books
export const getAllBookAction = () => async (dispatch) => {
  const { status, message, books } = await getAllBook();

  if (status === "success") {
    dispatch(setBooks(books));
  }
};

// adding new book to db
export const postNewBookAction = (bookObj) => async (dispatch) => {
  // call axios to post new book
  const pending = createBook(bookObj);

  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;

  toast[status](message);

  if (status === "success") {
    // get all books and store in redux
    dispatch(getAllBookAction());
    return {
      status,
    };
  }
};

// updating a book to db
export const updateBookAction = (bookObj) => async (dispatch) => {
  // call axios to post new book
  const pending = updateBook(bookObj);

  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;

  toast[status](message);

  if (status === "success") {
    // get all books and store in redux
    dispatch(getAllBookAction());
    dispatch(setSelectedBook({}));

    return {
      status,
    };
  }
};
// updating a book to db
export const deleteBookAction = (_id) => async (dispatch) => {
  // call axios to post new book
  const pending = deleteBook(_id);

  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;

  toast[status](message);

  if (status === "success") {
    // get all books and store in redux
    dispatch(getAllBookAction());
    dispatch(setSelectedBook({}));

    return {
      status,
    };
  }
};
