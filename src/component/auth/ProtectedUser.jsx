import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser, selectUserInfo } from "./Authslice";

const ProtectedUser = ({ children }) => {
  const userInfo = useSelector(selectUserInfo);
  // console.log(userInfo);
  if (!userInfo || (!userInfo.username && userInfo.role == "user")) {
    return <Navigate to="/loginpage" replace={true} />;
  }

  return children;
};

export default ProtectedUser;
