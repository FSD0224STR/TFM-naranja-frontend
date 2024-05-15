import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";

const Header = ({ isLoggedIn }) => {
  return (
    <header>
      <nav className="header">
        <Link to="/home">Home</Link>
        {!isLoggedIn && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        {isLoggedIn && <LogOut />}
        <Link to="/profile">Profile</Link>
        <Link to="/addProduct">addProduct</Link>
        <Link to="/listProducts">ListProducts</Link>
      </nav>
    </header>
  );
};

export default Header;

