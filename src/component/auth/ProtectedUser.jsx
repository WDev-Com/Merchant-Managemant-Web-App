import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "./Authslice";

const ProtectedUser = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  // console.log(user);
  if (!user) {
    return <Navigate to="/loginpage" replace={true} />;
  }

  return children;
};

export default ProtectedUser;
