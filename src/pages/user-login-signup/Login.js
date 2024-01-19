import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import CustomInput from "../../components/custom-inputs/CustomInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../helpers/axiosHelper";
import { autoLogin, postLoginUserAction } from "./userAction";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [display, setDisplay] = useState({});

  const { user } = useSelector((state) => state.userInfo);

  const fromLocation = location?.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    user?._id && navigate(fromLocation);
    !user?._id && dispatch(autoLogin());
  }, [user?._id, navigate, dispatch]);

  const inputs = [
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      required: true,
      forwardRef: emailRef,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      required: true,
      forwardRef: passwordRef,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setDisplay({});

    // check email and password
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      return toast.error("Email and / or password must be provided!");
    }

    // call axios for login
    const pending = loginUser({ email, password });

    toast.promise(pending, {
      pending: "Please wait...",
    });

    const { status, message, jwts } = await pending;

    // if login success
    if (status === "success") {
      // store jwts in session and local storage
      const { accessJWT, refreshJWT } = jwts;
      sessionStorage.setItem("accessJWT", accessJWT);
      localStorage.setItem("refreshJWT", refreshJWT);

      // dispatch action to store user info in redux store
      dispatch(postLoginUserAction());
      // navigate("/dashboard");
      return;
    }

    // if login failed
    setDisplay({
      status,
      message,
    });
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center custom-signup-container"
    >
      <Row className="d-flex align-items-center">
        <Col md={true}>
          {display.message && <Alert variant="danger">{display.message}</Alert>}

          <p className="rounded shadow-lg text-center p-3">
            Welcome to our Library Management System! 📚🔐
            <br />
            Step into the world of knowledge and exploration. Your journey
            begins here!
            <br />
            Log in to access a treasure trove of books, resources, and endless
            possibilities. Let's embark on this literary adventure together.
            Happy reading and learning! 🌟📖
          </p>
        </Col>
        <Col md={true}>
          <Form className="rounded shadow-lg p-3" onSubmit={handleOnSubmit}>
            <h3>Please login!</h3>
            <hr />

            {inputs.map((item, i) => (
              <CustomInput {...item} key={i} />
            ))}

            <Button
              variant="success"
              type="submit"
              className="custom-primary-btn"
            >
              Login
            </Button>
          </Form>

          <p className="nav-link rounded shadow-lg p-3 mt-3 text-end">
            Not a member ?{" "}
            <Link to="/admin-signup">
              <Button variant="warning" className="custom-secondary-btn">
                Create Account
              </Button>
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
