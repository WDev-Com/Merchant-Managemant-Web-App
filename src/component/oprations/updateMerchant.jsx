import React, { useEffect, useState } from "react";
import "../../CSS/operate-form.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import InchargeNavbar from "./inchargeNavbar";
import {
  fetchMerchantByIdAsync,
  selectCurrentMerchant,
  updateMerchantAsync,
} from "./operationSlice";

const UpdateMerchant = () => {
  const { MID } = useParams();
  const dispatch = useDispatch();
  const currMerchant = useSelector(selectCurrentMerchant);
  // console.log(currMerchant);
  const [datas, setDatas] = useState({
    fname: "",
    lname: "",
    username: "",
    category: "",
    address: "",
    email: "",
    phone: "",
    profileImg: "",
  });

  function inputHandler(event) {
    let { name, value } = event.target;
    setDatas((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  }

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    username: "",
    category: "",
    email: "",
    address: "",
    phone: "",
    profileImg: "",
  });

  useEffect(() => {
    if (MID) {
      dispatch(fetchMerchantByIdAsync(MID));
    }
  }, [MID, dispatch]);

  useEffect(() => {
    if (currMerchant && currMerchant._id) {
      let nameParts = currMerchant.name.split(" ");
      if (nameParts.length === 1) {
        setDatas((prev) => ({
          ...prev,
          fname: nameParts[0],
          lname: "",
        }));
      } else {
        setDatas((prev) => ({
          ...prev,
          fname: nameParts[0],
          lname: nameParts[1],
        }));
      }

      // Set other merchant data
      setDatas((prev) => ({
        ...prev,
        username: currMerchant.username,
        category: currMerchant.category,
        address: currMerchant.address,
        email: currMerchant.email,
        phone: currMerchant.phone,
        profileImg: currMerchant.profileImg,
      }));
    }
  }, [currMerchant]);

  const handleBlur = (event) => {
    const { name, value } = event.target;
    let error = "";
    if (!datas.username.trim()) {
      errors.username = "First Name is required";
      isValid = false;
    }
    if (name === "fname" && !value.trim()) {
      error = "First Name is required";
    } else if (name === "lname" && !value.trim()) {
      error = "Last Name is required";
    } else if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Email address is invalid";
      }
    } else if (name === "phone") {
      if (!value.trim()) {
        error = "Phone Number is required";
      } else if (value.length < 10) {
        error = "Phone Number must be at least 10 digits";
      } else if (value.length > 10) {
        error = "Phone number must be at least 10 digits";
      }
    } else if (name === "address" && !value.trim()) {
      error = "Address is required";
    } else if (name === "category" && !value.trim()) {
      error = "Merchant Category is required";
    } else if (name === "profileImg" && !value.trim()) {
      error = "Image URL is required";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const valid = Object.values(errors).every((err) => err === "");
    if (valid) {
      dispatch(updateMerchantAsync({ id: currMerchant._id, datas }));
      setDatas({
        fname: "",
        lname: "",
        username: "",
        address: "",
        category: "",
        email: "",
        phone: "",
        profileImg: "",
      });
      setErrors({});
    }
  };

  return (
    <>
      <InchargeNavbar />
      <div className="add-opreation">
        <div className="add-top">
          <Link to="/merchantlist">
            <button>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
              Back
            </button>
          </Link>
          <h1>Update Merchant</h1>
        </div>
        <form action="" className="add-form">
          <div className="add-input">
            <label htmlFor="">First Name</label>
            <div className="input">
              <input
                type="text"
                name="fname"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={datas.fname}
              />
              {errors.fname && <span className="error">{errors.fname}</span>}
            </div>
          </div>
          <div className="add-input">
            <label htmlFor="">Last Name</label>
            <div className="input">
              <input
                type="text"
                name="lname"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={datas.lname}
              />
              {errors.lname && <span className="error">{errors.lname}</span>}
            </div>
          </div>
          <div className="add-input">
            <label htmlFor="">UserName</label> <div className="input"></div>
            <div className="input">
              <input
                type="text"
                name="username"
                onChange={inputHandler}
                value={datas.username}
              />
              {errors.username && (
                <span className="error">{errors.username}</span>
              )}
            </div>
          </div>
          <div className="add-input">
            <label htmlFor="">Category</label>
            <div className="input">
              <input
                type="text"
                name="category"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={datas.category}
              />
              {errors.category && (
                <span className="error">{errors.category}</span>
              )}
            </div>
          </div>
          <div className="add-input">
            <label htmlFor="">Address</label>
            <div className="input">
              <input
                type="text"
                name="address"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={datas.address}
              />
              {errors.address && (
                <span className="error">{errors.address}</span>
              )}
            </div>
          </div>
          <div className="add-input">
            <label htmlFor="">E-mail Adr</label>
            <div className="input">
              <input
                type="text"
                name="email"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={datas.email}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>
          <div className="add-input">
            <label htmlFor="">Phone No</label>
            <div className="input">
              <input
                type="number"
                name="phone"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={datas.phone}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>
          <div className="add-input">
            <label htmlFor="">Image URL</label>
            <div className="input">
              <input
                type="text"
                name="profileImg"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={datas.profileImg}
              />
              {errors.profileImg && (
                <span className="error">{errors.profileImg}</span>
              )}
            </div>
          </div>

          <div className="add-m-btn">
            <button onClick={handleUpdate}>Update Merchant</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setDatas({
                  fname: "",
                  lname: "",
                  address: "",
                  category: "",
                  email: "",
                  phone: "",
                  profileImg: "",
                });
                setErrors({});
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateMerchant;
