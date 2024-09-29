import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadStoredToken, selectUserInfo } from "./Authslice";
import { clearCurrentMerchantBids } from "../merchant/merchantSilce";

const ProtectedAdmin = ({ children }) => {
  const validation = loadStoredToken(); // Load token from localStorage
  // console.log(validation);
  let dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  useEffect(() => {
    dispatch(clearCurrentMerchantBids());
  }, []);
  // Check if user is authenticated and has the 'admin' role
  if (
    !validation ||
    !validation.userInfo ||
    validation.userInfo.role !== "admin"
  ) {
    return <Navigate to="/loginpage" replace={true} />;
  }

  return children;
};

export default ProtectedAdmin;
