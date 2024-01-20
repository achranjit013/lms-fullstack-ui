import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header mainLayout="true" />

      <main className="main-body">{children}</main>

      <Footer />
    </>
  );
};

export default MainLayout;
