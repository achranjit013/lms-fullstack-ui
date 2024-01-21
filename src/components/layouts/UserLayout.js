import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const UserLayout = ({ children, title }) => {
  return (
    <div className="d-grid custom-user-layout">
      <div className="bg-dark text-light vh-100 d-none d-md-block">
        <Sidebar />
      </div>
      <div>
        <Header />

        <main className="main-body container-fluid py-3">
          <h2>{title}</h2>

          <hr />

          <div>{children}</div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
