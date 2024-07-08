import React from "react";
import SignUp from "../component/auth/signup";
import Navbar from "../component/common/Navbar";
import Footer from "../component/common/Footer";

const SignUpPage = (props) => {
  return (
    <>
      <Navbar />
      <SignUp />
      <Footer />
    </>
  );
};

SignUpPage.propTypes = {};

export default SignUpPage;
