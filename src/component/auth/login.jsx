import React, { useState } from "react";
import "../../CSS/authform.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMerchantByUserName,
  selectMerchant,
} from "../oprations/operationSlice";
import { login } from "./Authslice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showpass, setShowpass] = useState(false);
  const [logincred, setLogincred] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const merchant = useSelector(selectMerchant);
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
      await dispatch(getMerchantByUserName(logincred.username));
      let user;
      if (logincred.username === "admin") {
        user = window.localStorage.getItem("adminauth");
      } else {
        user = window.localStorage.getItem("auth");
      }
      let obj = JSON.parse(user);

      if (
        obj &&
        obj.username === logincred.username &&
        obj.password === logincred.password
      ) {
        dispatch(
          login({ username: logincred.username, password: logincred.password })
        );
        // console.log("Login successful:", {
        //   username: logincred.username,
        //   password: logincred.password,
        // });

        if (logincred.username === "admin") {
          navigate("/merchantlist");
          clearForm();
        } else if (merchant.id) {
          navigate(`/mDashBoard/${merchant.id}`);
          clearForm();
          // console.log("ok");
        }
      } else {
        alert("Invalid username or password");
      }
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
