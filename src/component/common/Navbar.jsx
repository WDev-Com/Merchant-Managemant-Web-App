import React, { useEffect, useRef, useState } from "react";
import "../../CSS/navbar.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navLinks = [
  { to: "/#home", text: "Home" },
  { to: "/#services", text: "Services" },
  { to: "/contact", text: "Contact" },
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1300) {
        setToggle(true);
        setShowMenu(false);
      } else {
        setToggle(false);
        setShowMenu(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggle]);

  const handleToggleClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header ref={navbarRef}>
      <nav className="nav-bar">
        <div className="logo">
          <img src="/logoIMP.png" alt="Logo" />
        </div>
        <div className="nav-links">
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                {link.to.startsWith("/#") ? (
                  <HashLink to={link.to}>{link.text}</HashLink>
                ) : (
                  <Link to={link.to}>{link.text}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="auth">
          <Link to={"/loginpage"}>
            <button id="sign-in">Sign In</button>
          </Link>
          <Link to={"/signuppage"}>
            <button id="sign-up">Sign Up</button>
          </Link>
        </div>
        {toggle && (
          <div className="toggle-button" onClick={handleToggleClick}>
            <i
              className={showMenu ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
            ></i>
          </div>
        )}
        <div className={classNames("dropdown-menu", showMenu ? "show" : "")}>
          <div className={classNames("nav-links", showMenu ? "show" : "")}>
            <ul>
              {navLinks.map((link, index) => (
                <li key={index}>
                  {link.to.startsWith("/#") ? (
                    <HashLink to={link.to}>{link.text}</HashLink>
                  ) : (
                    <Link to={link.to}>{link.text}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className={classNames("auth", showMenu ? "show" : "")}>
            <Link to={"/loginpage"}>
              <button id="sign-in">Sign In</button>
            </Link>
            <Link to={"/signuppage"}>
              <button id="sign-up">Sign Up</button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
