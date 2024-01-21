import React, { useEffect, useState } from "react";
import UserLayout from "../../components/layouts/UserLayout";
import BookTable from "../../components/books/BookTable";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookAction } from "./bookAction";

const Book = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    user?._id && dispatch(getAllBookAction());
  }, [user?._id, dispatch]);

  return (
    <UserLayout title="Books">
      <BookTable />
    </UserLayout>
  );
};

export default Book;
