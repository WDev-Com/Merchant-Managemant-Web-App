import React, { useEffect, useState } from "react";
import "../../CSS/authform.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  authError,
  login,
  loginUserAsync,
  selectToken,
  selectUserInfo,
} from "./Authslice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  // console.log(token);
  const userInfo = useSelector(selectUserInfo);
  // console.log(userInfo);
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", JSON.stringify({ token: token }));
      if (userInfo.role == "user") {
        navigate("/mDashBoard");
      }
      if (userInfo.role == "admin") {
        navigate("/merchantlist");
      }
    }
  }, [token]);
  const [showpass, setShowpass] = useState(false);
  const [logincred, setLogincred] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowpass(!showpass);
  };

  const inputhandler = (e) => {
    let { name, value } = e.target;
    setLogincred((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const validateInputs = () => {
    let isValid = true;
    let errors = {};

    if (!logincred.username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    }
    if (!logincred.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const clearForm = () => {
    setLogincred({
      username: "",
      password: "",
    });
    setErrors({
      username: "",
      password: "",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      dispatch(loginUserAsync(logincred));
      clearForm();
    }
  };
  return (
    <div className="authpage">
      <form className="auth-form" onSubmit={handleLogin}>
        <div className="title">
          <h1>Login Here</h1>
        </div>
        <div className="inputgroup">
          <div className="username-input">
            <input
              type="text"
              id="username"
              name="username"
              value={logincred.username}
              onChange={inputhandler}
              placeholder="Enter User Name"
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>
          <div className="password-input">
            <input
              type={showpass ? "text" : "password"}
              id="password"
              name="password"
              value={logincred.password}
              onChange={inputhandler}
              placeholder="Password"
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
            <span id="password-btns" onClick={togglePasswordVisibility}>
              <i
                className={classNames(
                  "fa-solid fa-eye",
                  showpass ? "" : "show"
                )}
              ></i>
              <i
                className={classNames(
                  "fa fa-eye-slash",
                  showpass ? "show" : ""
                )}
                aria-hidden="true"
              ></i>
            </span>
          </div>
        </div>
        <button type="submit" id="auth-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
