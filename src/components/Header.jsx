import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/LogContext";
import logo from "../assets/Comparador-logo.png";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const { socket, setMessagesList } = useContext(SocketContext);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    logout();
    setIsChecked(false);
    setShowConfirm(false);
    socket.current.emit("userDisconnect");
    setMessagesList([]);
  };

  const handleToggle = () => {
    if (isChecked) {
      setShowConfirm(true);
    } else {
      setIsChecked(!isChecked);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Cpmparador" />
      </div>
      <br />
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
          placeholder="Search..."
        />
        <button className="search-button">&#x1F50E;&#xFE0E;</button>
      </div>
      <div className="header-links">
        <Link to="/home">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/addProduct">Add Product</Link>
            <Link to="/listProducts">List Products</Link>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
              />
              <span className="toggle-switch-slider"></span>
            </label>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
      {showConfirm && (
        <div className="confirm-box">
          <div className="confirm-content">
            <h2>Confirm Logout</h2>
            <p>
              <small>
                Adiós! but don't forget to come back for more chorizo 😉
              </small>
            </p>
            <button onClick={handleLogout}>Yes, Logout</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
