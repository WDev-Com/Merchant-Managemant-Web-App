import React from "react";
import Navbar from "../component/common/Navbar";
import Footer from "../component/common/Footer";
import Login from "../component/auth/login";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;
