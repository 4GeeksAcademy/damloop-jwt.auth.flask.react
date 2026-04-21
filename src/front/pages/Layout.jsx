import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
