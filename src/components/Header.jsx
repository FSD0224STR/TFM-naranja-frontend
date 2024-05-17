import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/LogContext";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header>
      <nav className="header">
        <Link to="/home">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/addProduct">Add Product</Link>
            <Link to="/listProducts">List Products</Link>
            <Link onClick={logout} to="/login" >Logout</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
