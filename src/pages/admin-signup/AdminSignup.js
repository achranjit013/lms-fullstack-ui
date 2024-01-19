import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import CustomInput from "../../components/custom-inputs/CustomInput";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createAdmin } from "../../helpers/axiosHelper";

const initialFormState = {
  fname: "",
  lname: "",
  address: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AdminSignup = () => {
  const [form, setForm] = useState(initialFormState);
  const [display, setDisplay] = useState({});

  const inputs = [
    {
      label: "First Name",
      type: "text",
      name: "fname",
      placeholder: "Enter your first name",
      required: true,
      value: form.fname,
    },
    {
      label: "Last Name",
      type: "text",
      name: "lname",
      placeholder: "Enter your last name",
      required: true,
      value: form.lname,
    },
    {
      label: "Address",
      type: "text",
      name: "address",
      placeholder: "Enter your address",
      value: form.address,
    },
    {
      label: "Phone",
      type: "number",
      name: "phone",
      placeholder: "Enter your phone",
      value: form.phone,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      required: true,
      value: form.email,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      required: true,
      value: form.password,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      placeholder: "Re-enter your password",
      required: true,
      value: form.confirmPassword,
    },
  ];

  const handleOnChange = (e) => {
    setDisplay({});

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;

    // check passwords
    if (confirmPassword !== rest.password) {
      return alert(
        "Oops! Passwords do not match. Please double-check and try again. Your security is our priority!"
      );
    }

    // if passwords match, create admin in db
    const pending = createAdmin(rest);

    toast.promise(pending, {
      pending: "Please wait...",
    });

    const { status, message } = await pending;

    setDisplay({
      status,
      message,
    });

    if (status === "success") {
      // clear the form input fields
      setForm(initialFormState);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center p-3 custom-signup-container"
    >
      <Row className="d-flex align-items-center">
        <Col md={true}>
          {display.message && (
            <Alert
              variant={display.status === "success" ? "success" : "danger"}
            >
              {display.message}
            </Alert>
          )}

          <p className="rounded shadow-lg text-center p-3">
            Welcome to our Library Management System!
            <br />
            Empowering you to seamlessly organize, access, and explore a world
            of knowledge. Happy reading and managing!
          </p>
        </Col>
        <Col md={true}>
          <Form className="rounded shadow-lg p-3" onSubmit={handleOnSubmit}>
            <h3>
              New here . . . ? <br /> Please create your new admin account!
            </h3>
            <hr />

            {inputs.map((item, i) => (
              <CustomInput {...item} onChange={handleOnChange} key={i} />
            ))}

            <Button
              variant="success"
              type="submit"
              className="custom-primary-btn"
            >
              Create Account
            </Button>
          </Form>

          <p className="nav-link rounded shadow-lg p-3 mt-3 text-end">
            Already a member ?{" "}
            <Link to="/admin-signup">
              <Button variant="warning" className="custom-secondary-btn">
                Login
              </Button>
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSignup;
