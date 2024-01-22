import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ title, children }) => {
  return (
    <>
      <Header mainLayout="true" />

      <main className="main-body">
        <h2>{title}</h2>

        <hr />

        {children}
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
