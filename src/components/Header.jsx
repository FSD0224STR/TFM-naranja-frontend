import React from "react";
import "./Header.css"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header >
            <nav className="header">
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/addProduct">addProduct</Link>
              </nav>
        </header>
    );
}

export default Header;
