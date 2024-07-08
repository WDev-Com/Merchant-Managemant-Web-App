import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "./Authslice";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUser);

  if (!user || user.username !== "admin") {
    return <Navigate to="/loginpage" replace={true} />;
  }

  return children;
};

export default ProtectedAdmin;
