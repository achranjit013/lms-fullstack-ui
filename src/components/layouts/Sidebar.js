import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdWorkHistory,
  MdLibraryBooks,
  MdOutlineLibraryBooks,
  MdReviews,
} from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { PiStudentBold } from "react-icons/pi";
import { IoCreateOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.userInfo);
  return (
    <>
      <div className="d-none d-md-flex  align-items-center justify-content-center  custom-side-heading">
        <h5>Hello, {user?.fname} !</h5>
      </div>

      <hr className="d-none d-md-block" />

      <Navbar className="flex-column align-items-start p-4 gap-4">
        <Link
          className="nav-link d-flex d-flex align-items-center gap-1"
          to="/dashboard"
        >
          <MdDashboard />
          Dashboard
        </Link>
        <Link className="nav-link d-flex align-items-center gap-1" to="/books">
          <MdLibraryBooks />
          Books
        </Link>

        {user?.role === "admin" && (
          <>
            <Link
              className="nav-link d-flex align-items-center gap-1"
              to="/reviews"
            >
              <MdReviews />
              Reviews
            </Link>
            <Link
              className="nav-link d-flex align-items-center gap-1"
              to="/students"
            >
              <PiStudentBold />
              Students
            </Link>
            <Link
              className="nav-link d-flex align-items-center gap-1"
              to="/burrow-history"
            >
              <MdWorkHistory />
              Burrow History
            </Link>
          </>
        )}

        <Link
          className="nav-link d-flex align-items-center gap-1"
          to="/my-books"
        >
          <MdOutlineLibraryBooks />
          My Books
        </Link>
      </Navbar>

      <hr />

      <Navbar className="flex-column align-items-start p-4 gap-4">
        <Link
          className="nav-link d-flex align-items-center gap-1"
          to="/profile"
        >
          <ImProfile />
          Profile
        </Link>

        {user?.role === "admin" && (
          <Link
            className="nav-link d-flex align-items-center gap-1"
            to="/admin-signup"
          >
            <IoCreateOutline />
            Create New Admin
          </Link>
        )}
      </Navbar>
    </>

    // <div className="bg-dark text-light vh-100">
    //   <div className="d-flex align-items-center justify-content-center custom-side-heading">
    //     <h5>Hello, {user?.fname} !</h5>
    //   </div>

    //   <hr />

    //   <Navbar className="flex-column align-items-start p-4 gap-4">
    //     <Link
    //       className="nav-link d-flex d-flex align-items-center gap-1"
    //       to="/dashboard"
    //     >
    //       <MdDashboard />
    //       Dashboard
    //     </Link>
    //     <Link className="nav-link d-flex align-items-center gap-1" to="/books">
    //       <MdLibraryBooks />
    //       Books
    //     </Link>

    //     {user?.role === "admin" && (
    //       <>
    //         <Link
    //           className="nav-link d-flex align-items-center gap-1"
    //           to="/reviews"
    //         >
    //           <MdReviews />
    //           Reviews
    //         </Link>
    //         <Link
    //           className="nav-link d-flex align-items-center gap-1"
    //           to="/students"
    //         >
    //           <PiStudentBold />
    //           Students
    //         </Link>
    //         <Link
    //           className="nav-link d-flex align-items-center gap-1"
    //           to="/burrow-history"
    //         >
    //           <MdWorkHistory />
    //           Burrow History
    //         </Link>
    //       </>
    //     )}

    //     <Link
    //       className="nav-link d-flex align-items-center gap-1"
    //       to="/my-books"
    //     >
    //       <MdOutlineLibraryBooks />
    //       My Books
    //     </Link>
    //   </Navbar>

    //   <hr />

    //   <Navbar className="flex-column align-items-start p-4 gap-4">
    //     <Link
    //       className="nav-link d-flex align-items-center gap-1"
    //       to="/profile"
    //     >
    //       <ImProfile />
    //       Profile
    //     </Link>

    //     {user?.role === "admin" && (
    //       <Link
    //         className="nav-link d-flex align-items-center gap-1"
    //         to="/admin-signup"
    //       >
    //         <IoCreateOutline />
    //         Create New Admin
    //       </Link>
    //     )}
    //   </Navbar>
    // </div>
  );
};

export default Sidebar;
