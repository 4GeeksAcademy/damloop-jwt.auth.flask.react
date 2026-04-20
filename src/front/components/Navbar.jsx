import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light border-bottom shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">

        <Link to="/" className="navbar-brand fw-bold fs-4">JWT App</Link>

        <div className="d-flex align-items-center gap-2">

          {!isAuthenticated && (
            <>
              <NavLink to="/signup" className="btn btn-outline-primary">
                Signup
              </NavLink>

              <NavLink to="/login" className="btn btn-outline-success">
                Login
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <>
              <NavLink to="/private" className="btn btn-outline-secondary">
                Private
              </NavLink>

              <span className="fw-semibold me-2">
                {user?.email}
              </span>

              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
