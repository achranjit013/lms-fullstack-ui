import React, { useEffect } from "react";
import UserLayout from "../../components/layouts/UserLayout";
import StudentTable from "../../components/students/StudentTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentAction } from "./studentAction";

const Student = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);

  console.log(user);

  useEffect(() => {
    user?._id && dispatch(getAllStudentAction());
  }, [user?._id, dispatch]);
  return (
    <UserLayout title="Students">
      <StudentTable />
    </UserLayout>
  );
};

export default Student;
