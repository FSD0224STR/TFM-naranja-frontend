import React, { useState, useEffect } from "react";
import "./Footer.css";
import { findCategories } from "../apiService/categoryApi";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaAccessibleIcon,
} from "react-icons/fa";

function Footer() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const response = await findCategories();
    if (response.error) {
      console.error("Error al obtener categorías:", response.error);
    } else {
      setCategories(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='footer'>
      <div className='container'>
        <div className='top'>
          <div className='item'>
            <h2>Categories</h2>
            {categories.map((category) => (
              <Link to={`/listProducts/${category._id}`} key={category._id}>
                <span style={{ color: "white" }}>{category.category}</span>
              </Link>
            ))}
          </div>
          <div className='item'>
            <h2>About</h2>
            <span>About us</span>
            <span>Press & News</span>
            <span>Editorial guidelines</span>
          </div>
          <div className='item'>
            <h2>Legal</h2>
            <span>Imprint</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
        {/* <hr /> */}
        <div className='bottom'>
          <div className='left'>
            <h2>Comparador</h2>
            <span>© Comparador International S.L. 2024</span>
            <br />
          </div>
          <div className='right'>
            <div className='social'>
              <FaFacebook size={24} color='#4267B2' />
              <FaInstagram size={24} color='#E1306C' />
              <FaGithub size={24} color='#fff' />
              <FaAccessibleIcon size={24} color='#fff' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
