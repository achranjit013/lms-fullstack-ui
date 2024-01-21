import React, { useState } from "react";
import UserLayout from "../../components/layouts/UserLayout";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/custom-inputs/CustomInput";
import { toast } from "react-toastify";
import { postNewBookAction } from "./bookAction";
import { useDispatch, useSelector } from "react-redux";

const initialFormState = {
  name: "",
  thumbnail: "",
  author: "",
  publishYear: "",
  isbn: "",
  description: "",
};

const NewBook = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialFormState);

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

  const isValidHttpUrl = (string) => {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // check if the url is valid
    const { thumbnail } = form;
    const isValidURL = isValidHttpUrl(thumbnail);

    if (!isValidURL) {
      return toast.error(
        "Please enter a valid URL (thumbnail). Make sure it includes 'http://' or 'https://'"
      );
    }

    // if everything is right, call book action to add new book and store in redux
    const { status } = await dispatch(postNewBookAction(form));

    if (status === "success") {
      // clear the form after success
      setForm(initialFormState);
    }
  };

  return (
    <UserLayout title="Add new book">
      <Link to="/books">
        <Button variant="secondary" className="fw-bold">
          &lt;&lt; Go back
        </Button>
      </Link>

      {/* Book add form */}
      <Form className="rounded shadow-lg p-3 mt-3" onSubmit={handleOnSubmit}>
        {inputs.map((item, i) => (
          <CustomInput {...item} onChange={handleOnChange} key={i} />
        ))}

        <Button variant="success" type="submit" className="custom-primary-btn">
          Add new book
        </Button>
      </Form>
    </UserLayout>
  );
};

export default NewBook;
