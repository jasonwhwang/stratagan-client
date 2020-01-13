import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-wrapper box-text-7 box-text-bold box-flex-row box-flex-acenter">
        <Link to="/about" className="footer-section-item box-flex-row-center box-text-8 box-color-mediumgray">About</Link>

        <Link to="/careers" className="footer-section-item box-flex-row-center box-text-8 box-color-mediumgray">Careers</Link>

        <Link to="/legal" className="footer-section-item box-flex-row-center box-text-8 box-color-mediumgray">Terms & Privacy</Link>

        <div className="box-spacer"></div>

        <div className="box-flex-row box-flex-acenter box-text-8 box-color-mediumgray box-margin-right-20">
          <p className="">©</p>
          <p className="box-margin-left-5">2020</p>
          <p className="box-margin-left-5">Stratagan</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;