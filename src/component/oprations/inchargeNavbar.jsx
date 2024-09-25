import React, { useEffect, useRef, useState } from "react";
import "../../CSS/navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { logout, logoutUserAsync } from "../auth/Authslice";
import { useDispatch } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navLinks = [
  { to: "/#home", text: "Home" },
  { to: "/merchantlist", text: "Merchant List" },
  { to: "/bidslist", text: "Bids List" },
];

const InchargeNavbar = () => {
  const [toggle, setToggle] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      <nav className="nav-bar-dashboard">
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
          <button
            id="logout"
            onClick={() => {
              // window.localStorage.removeItem("adminauth");
              navigate("/#home");
            }}
          >
            Logout
          </button>
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
          <div className={classNames("adminauth", showMenu ? "show" : "")}>
            <button
              id="logout"
              onClick={() => {
                dispatch(logoutUserAsync());
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default InchargeNavbar;
