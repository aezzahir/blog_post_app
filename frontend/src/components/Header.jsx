import React from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
      {/* Navbar links */}
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">
              HOME
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#posts">
              POSTS
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="login">
              LOGIN
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="register">
              REGISTER
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
