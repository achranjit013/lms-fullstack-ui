import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import libraryLogo from "../../assets/library-logo-bg.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { FaHome } from "react-icons/fa";
import { BiSolidLogIn, BiSolidLogOut } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { logoutUserAction } from "../../pages/user-login-signup/userAction";

const Header = ({ mainLayout }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);

  return (
    <Navbar key="md" expand="md" className="bg-body-tertiary custom-navbar">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <img
            src={libraryLogo}
            alt="lib logo"
            width={100}
            className="custom-lib-logo"
          />
        </Link>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
              <img
                src={libraryLogo}
                alt="lib logo"
                width={100}
                className="custom-lib-logo"
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {mainLayout ? (
                <Link
                  to="/dashboard"
                  className="nav-link d-flex align-items-center gap-1 px-4"
                >
                  <MdDashboard /> Dashboard
                </Link>
              ) : (
                <Link
                  to="/"
                  className="nav-link d-flex align-items-center gap-1 px-4"
                >
                  <FaHome /> Home
                </Link>
              )}

              {user?._id ? (
                <>
                  <Link
                    to="/"
                    className="nav-link d-flex align-items-center gap-1 px-4"
                    onClick={() => dispatch(logoutUserAction(user?.email))}
                  >
                    <BiSolidLogOut />
                    Logout
                  </Link>
                  <hr />

                  <div className="d-md-none">{!mainLayout && <Sidebar />}</div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="nav-link d-flex align-items-center gap-1"
                  >
                    <BiSolidLogIn /> Login
                  </Link>
                  <Link
                    to="/signup"
                    className="nav-link d-flex align-items-center gap-1"
                  >
                    <SiGnuprivacyguard /> Signup
                  </Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
