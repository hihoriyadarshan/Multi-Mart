import React from "react";
import playStore from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
       

      <div className="footerSection">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download the app for Android and iOS devices</p>
        <div className="appStores">
          <img src={playStore} alt="Google Play Store" />
          <img src={appStore} alt="Apple App Store" />
        </div>
      </div>

      <div className="footerSection">
        <h1>MultiMart</h1>
        <p>Quality is our top priority</p>
        <p>&copy; 2023 YourCompany</p>
      </div>

      <div className="footerSection">
        <h4>pages</h4>
        <div className="socialLinks">
          <div>
        <Link to="/about">About </Link>
        |
        <Link to="/contact">Contact Us </Link>
        |
        <Link to="/Policy">Privacy Policy </Link>
        |
    </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
