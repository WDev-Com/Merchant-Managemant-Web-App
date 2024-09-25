import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "./Authslice";

const ProtectedAdmin = ({ children }) => {
  const userInfo = useSelector(selectUserInfo);
  if (!userInfo || (!userInfo.username && userInfo.role == "admin")) {
    return <Navigate to="/loginpage" replace={true} />;
  }

  return children;
};

export default ProtectedAdmin;
