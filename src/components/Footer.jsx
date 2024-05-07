import React from "react";
import "./Footer.css";
import facebook from "../assets/facebook.png";
import github from "../assets/github.png";
import x from "../assets/x.png";
import instagram from "../assets/instagram.png";
import accessibility from "../assets/accessibility.png";

function Footer() {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='top'>
          <div className='item'>
            <h2>Categories</h2>
            <span>Olive oil</span>
            <span>Cheeses</span>
            <span>Tomates</span>
            <span>Vinagres</span>
            <span>Add you product</span>
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
        <hr />
        <div className='bottom'>
          <div className='left'>
            <h2>Comparador</h2>
            <span>© Comparador International S.L. 2024</span>
            <br />
          </div>
          <div className='right'>
            <div className='social'>
              <img src={x} alt='' />
              <img src={facebook} alt='' />
              <img src={instagram} alt='' />
              <img src={github} alt='' />
            </div>
            <img src={accessibility} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
