import { toast } from "react-toastify";

import { setStudents } from "./studentSlice";
import { getAllStudent } from "../../helpers/axiosHelper";

// getting all students
export const getAllStudentAction = () => async (dispatch) => {
  const { status, message, userList } = await getAllStudent();

  if (status === "success") {
    dispatch(setStudents(userList));
  }
};

// updating a student to db
// export const updateStudentAction = (studentObj) => async (dispatch) => {
//   // call axios to post new student
//   const pending = updateStudent(studentObj);

//   toast.promise(pending, {
//     pending: "Please wait...",
//   });

//   const { status, message } = await pending;

//   toast[status](message);

//   if (status === "success") {
//     // get all students and store in redux
//     dispatch(getAllStudentAction());
//     dispatch(setSelectedStudent({}));

//     return {
//       status,
//     };
//   }
// };
// updating a student to db
// export const deleteStudentAction = (_id) => async (dispatch) => {
//   // call axios to post new student
//   const pending = deleteStudent(_id);

//   toast.promise(pending, {
//     pending: "Please wait...",
//   });

//   const { status, message } = await pending;

//   toast[status](message);

//   if (status === "success") {
//     // get all students and store in redux
//     dispatch(getAllStudentAction());
//     dispatch(setSelectedStudent({}));

//     return {
//       status,
//     };
//   }
// };
