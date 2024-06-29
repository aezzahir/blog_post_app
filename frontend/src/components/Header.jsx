import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((userInfo) => {
        setUserInfo(userInfo);
      });
  }, []);

  async function logout() {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo({});
  }

  const email = userInfo.email;
  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
      {/* Navbar links */}
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav ml-auto">
          {email ? (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  HOME
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="posts">
                  POSTS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="create">
                  CREATE POST
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={logout}>
                  LOGOUT
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  HOME
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="posts">
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
