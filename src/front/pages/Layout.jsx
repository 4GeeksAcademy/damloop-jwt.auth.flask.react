import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mt-4">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
