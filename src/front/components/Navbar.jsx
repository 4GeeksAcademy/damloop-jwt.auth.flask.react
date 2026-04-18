import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <div className="container">
        <Link to="/" className="navbar-brand">JWT App</Link>
        <div>
          <Link to="/signup" className="btn btn-outline-primary me-2">Signup</Link>
          <Link to="/login" className="btn btn-outline-success me-2">Login</Link>
          <Link to="/private" className="btn btn-outline-secondary me-2">Private</Link>
          {token && (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
