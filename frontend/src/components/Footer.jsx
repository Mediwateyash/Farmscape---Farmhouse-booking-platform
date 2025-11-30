import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Designed and Developed by <strong>Diwate Yash</strong></p>
                <div className="social-links">
                    <a href="https://www.linkedin.com/in/yash-diwate-7a1b3a203/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://github.com/Mediwateyash" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
                <p className="copyright">&copy; {new Date().getFullYear()} Cloud by DY. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
