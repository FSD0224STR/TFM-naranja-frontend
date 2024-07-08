import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/LogContext";
import logo from "../assets/Comparador-logo.png";
import { IoSearch } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Button from "./Button";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    logout();
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <header className='header'>
      <div className='logo'>
        <img src={logo} alt='Cpmparador' />
        {/* <h1>Comparador</h1> */}
      </div>
      <br />
      <div className='search-container'>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearch}
          className='search-input'
          placeholder='Search...'
        />
        <button className='search-button'>
          <IoSearch />
        </button>
      </div>
      <div className='header-links'>
        <Link to='/home'>Home</Link>
        {isLoggedIn ? (
          <>
            <Link to='/addProduct'>Add Product</Link>
            <Link to='/listProducts'>List Products</Link>
            <Link to='/favouriteProducts'>
              <FaHeart />
            </Link>
            <Link to='/profile'>
              <MdPerson />
            </Link>
            <Link to='#' onClick={handleConfirm}>
              <RiLogoutBoxRLine />
            </Link>
          </>
        ) : (
          <>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
          </>
        )}
      </div>
      {showConfirm && (
        <div className='confirm-box'>
          <div className='confirm-content'>
            <h2>Confirm Logout</h2>
            <p>
              <small>
                Adiós! but don't forget to come back for more chorizo 😉
              </small>
            </p>
            <Button color='red' onClick={handleLogout}>
              Yes, Logout
            </Button>
            <Button color='primary' onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
