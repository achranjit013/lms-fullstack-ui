import { toast } from "react-toastify";
import { createBook, getAllBook } from "../../helpers/axiosHelper";
import { setBooks, setSelectedBook } from "./bookSlice";

export const getSelectedBookAction = (_id) => async (dispatch) => {
  const { status, message, books } = await getAllBook(_id);
  if (status === "success") {
    dispatch(setSelectedBook(books));
  }
};

export const getAllBookAction = () => async (dispatch) => {
  const { status, message, books } = await getAllBook();

  if (status === "success") {
    dispatch(setBooks(books));
  }
};

export const postNewBookAction = (bookObj) => async (dispatch) => {
  // call api to post new book
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
