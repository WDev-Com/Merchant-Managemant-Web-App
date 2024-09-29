import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadStoredToken, selectUserInfo } from "./Authslice";

const ProtectedUser = ({ children }) => {
  const validation = loadStoredToken(); // Load token from localStorage
  // console.log(validation);

  const userInfo = useSelector(selectUserInfo);

  // Check if user is authenticated and has the 'user' role
  if (
    !validation ||
    !validation.userInfo ||
    validation.userInfo.role !== "user"
  ) {
    return <Navigate to="/loginpage" replace={true} />;
  }

  return children;
};

export default ProtectedUser;
