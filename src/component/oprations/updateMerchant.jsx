import React, { useEffect, useState } from "react";
import "../../CSS/operate-form.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewMerchant,
  getMerchantById,
  selectMerchant,
  updateMerchant,
} from "./operationSlice";
import InchargeNavbar from "./inchargeNavbar";

const UpdateMerchant = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currMerchant = useSelector(selectMerchant);

  const [datas, setDatas] = useState({
    id: "",
    fname: "",
    lname: "",
    username: "",
    type: "",
    address: "",
    email: "",
    phone: "",
    imgurl: "",
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    username: "",
    type: "",
    email: "",
    address: "",
    phone: "",
    imgurl: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getMerchantById(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currMerchant && currMerchant.id) {
      setDatas(currMerchant);
    }
  }, [currMerchant]);

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setDatas((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

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
    } else if (name === "type" && !value.trim()) {
      error = "Merchant Type is required";
    } else if (name === "imgurl" && !value.trim()) {
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
      dispatch(updateMerchant(datas));
      setDatas({
        fname: "",
        lname: "",
        username: "",
        type: "",
        address: "",
        email: "",
        phone: "",
        imgurl: "",
      });
      setErrors({});
      alert("Merchant updated");
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
                name="type"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={datas.type}
              />
              {errors.type && <span className="error">{errors.type}</span>}
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
                name="imgurl"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={datas.imgurl}
              />
              {errors.imgurl && <span className="error">{errors.imgurl}</span>}
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
                  type: "",
                  email: "",
                  phone: "",
                  imgurl: "",
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
