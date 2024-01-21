import React, { useEffect, useState } from "react";
import UserLayout from "../../components/layouts/UserLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/custom-inputs/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBookAction,
  getSelectedBookAction,
  updateBookAction,
} from "./bookAction";

const EditBook = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const { _id } = useParams();

  const { selectedBook } = useSelector((state) => state.bookInfo);

  useEffect(() => {
    if (_id !== form._id) {
      // use that _id to fetch the book from server
      dispatch(getSelectedBookAction(_id));
      setForm(selectedBook);
    }
  }, [_id, dispatch, form._id, selectedBook]);

  const inputs = [
    {
      label: "Name",
      name: "name",
      placeholder: "Enter book name",
      type: "text",
      required: true,
      value: form.name,
    },
    {
      label: "Thumbnail",
      name: "thumbnail",
      placeholder: "Enter image (thumbnail) url",
      type: "url",
      required: true,
      value: form.thumbnail,
    },
    {
      label: "Author",
      name: "author",
      placeholder: "Enter book author",
      type: "text",
      required: true,
      value: form.author,
    },
    {
      label: "Published year",
      name: "publishYear",
      placeholder: "Enter book published year",
      type: "number",
      required: true,
      value: form.publishYear,
    },
    {
      label: "ISBN",
      name: "isbn",
      placeholder: "Enter book isbn",
      type: "text",
      required: true,
      value: form.isbn,
      disabled: true,
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Enter book description",
      type: "text",
      as: "textarea",
      rows: 5,
      required: true,
      value: form.description,
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnUpdate = async (e) => {
    e.preventDefault();

    const { __v, updatedAt, isbn, createdAt, ...rest } = form;

    if (
      !window.confirm(`Are you sure to update ${rest.name} by ${rest.author}`)
    ) {
      return;
    }

    const { status } = await dispatch(updateBookAction(rest));

    if (status === "success") {
      navigate("/books");
    }
  };

  const handleOnDelete = async () => {
    const { name, author } = form;

    if (!window.confirm(`Are you sure to delete ${name} by ${author}`)) {
      return;
    }

    const { status } = await dispatch(deleteBookAction(_id));

    if (status === "success") {
      navigate("/books");
    }
  };

  return (
    <UserLayout title="Edit book details">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/books">
          <Button variant="secondary">&lt;&lt; Back</Button>
        </Link>

        <Button variant="danger" type="submit" onClick={handleOnDelete}>
          Delete
        </Button>
      </div>

      <Form
        className="form-center border rounded shadow-lg p-3 my-3"
        onSubmit={handleOnUpdate}
      >
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select name="status" onChange={handleOnChange} required>
            <option value="">-- select one --</option>
            <option value="active" selected={form.status === "active"}>
              active
            </option>
            <option value="inactive" selected={form.status === "inactive"}>
              inactive
            </option>
          </Form.Select>
        </Form.Group>

        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <Button variant="success" type="submit" className="custom-primary-btn">
          Update book
        </Button>
      </Form>
    </UserLayout>
  );
};

export default EditBook;
