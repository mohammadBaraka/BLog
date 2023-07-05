import React from "react";
import Logo from "../../images/logo.png";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer-container">
      <div className="footer">
        <img src={Logo} alt="Logo" />
        <h3>Developed By Mohammad Barakat</h3>
      </div>
    </div>
  );
}

export default Footer;
