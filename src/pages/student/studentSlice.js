import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
};

const studentSLice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, { payload = [] }) => {
      state.students = payload;
    },
  },
});

const { reducer, actions } = studentSLice;
export const { setStudents } = actions;
export default reducer;
