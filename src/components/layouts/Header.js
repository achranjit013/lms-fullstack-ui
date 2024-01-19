import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import libraryLogo from "../../assets/library-logo-bg.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar
      key="md"
      expand="md"
      className="bg-body-tertiary mb-3 custom-navbar"
    >
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
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/" className="nav-link">
                Logout
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
