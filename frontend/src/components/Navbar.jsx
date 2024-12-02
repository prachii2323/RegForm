import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const isAdminDashboard = location.pathname === "/Admin";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {}
      </div>
      <div className="navbar-right">
        <button className="navbar-button">
          {isAdminDashboard ? (
            <Link to="/" className="navbar-link">
              Back to Registration Form
            </Link>
          ) : (
            <Link to="/Admin" className="navbar-link">
              Admin Dashboard
            </Link>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;