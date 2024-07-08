import React, { useState } from "react";
import "../../CSS/authform.css";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const signup = () => {
  const navigate = useNavigate();
  const [showpass, setShowpass] = useState(false);

  const togglePasswordVisibility = () => {
    setShowpass(!showpass);
  };
  let [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  let handleInput = (e) => {
    let { name, value } = e.target;
    setCredentials((prevCredentials) => {
      return {
        ...prevCredentials,
        [name]: value,
      };
    });
  };
  const validateInputs = () => {
    let isValid = true;
    let errors = {};

    if (!credentials.username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    }
    if (!credentials.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <div className="authpage">
      <form
        className="auth-form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (validateInputs()) {
            if (credentials.username == "admin") {
              window.localStorage.setItem(
                "adminauth",
                JSON.stringify(credentials)
              );
            } else {
              window.localStorage.setItem("auth", JSON.stringify(credentials));
            }

            setCredentials({
              username: "",
              password: "",
            });
            navigate("/loginpage");
          }
        }}
      >
        <div className="title">
          <h1>Sign Up Here</h1>
        </div>
        <div className="inputgroup">
          <div className="username-input">
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleInput}
              value={credentials.username}
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
              onChange={handleInput}
              value={credentials.password}
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default signup;
