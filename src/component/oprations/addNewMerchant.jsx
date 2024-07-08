import React, { useState } from "react";
import "../../CSS/operate-form.css";
import InchargeNavbar from "./inchargeNavbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewMerchant, selectMerchants } from "./operationSlice";

const AddNewMerchant = () => {
  const merchants = useSelector(selectMerchants);

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
    type: "",
    email: "",
    address: "",
    phone: "",
    imgurl: "",
  });

  let dispatch = useDispatch();

  const createMerchant = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      let newData = { ...datas };
      newData.id = parseInt(
        Math.random() *
          newData.fname.charCodeAt(0) *
          newData.lname.charCodeAt(newData.lname.length - 1)
      );
      newData["bids"] = [];
      const lookForMerchant = merchants.some(
        (merchant) => merchant.username === newData.username
      );
      // console.log(lookForMerchant);
      if (!lookForMerchant) {
        dispatch(addNewMerchant(newData));
        setDatas({
          fname: "",
          lname: "",
          username: "",
          address: "",
          type: "",
          email: "",
          phone: "",
          imgurl: "",
        });
        alert("Merchant created");
      } else {
        alert("Merchant Username already exists");
      }
    }
  };
  const validateInputs = () => {
    let isValid = true;
    let errors = {};
    if (!datas.username.trim()) {
      errors.username = "First Name is required";
      isValid = false;
    }

    if (!datas.fname.trim()) {
      errors.fname = "First Name is required";
      isValid = false;
    }

    if (!datas.lname.trim()) {
      errors.lname = "Last Name is required";
      isValid = false;
    }

    if (!datas.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(datas.email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }
    if (!datas.phone.trim()) {
      errors.phone = "Phone Number is required";
      isValid = false;
    } else if (!/^[7-9][0-9]{9}$/.test(datas.phone)) {
      errors.phone = "Mobile should start with 7, 8, or 9 and be 9 digits long";
      isValid = false;
    } else if (datas.phone.length < 10) {
      errors.phone = "Phone Number must be at least 10 digits";
      isValid = false;
    } else if (datas.phone.length > 10) {
      errors.phone = "Phone number must be at least 10 digits";
      isValid = false;
    }

    if (!datas.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!datas.type.trim()) {
      errors.type = "Merchant Type is required";
      isValid = false;
    }

    if (!datas.imgurl.trim()) {
      errors.imgurl = "Image URL is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
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
          <h1>Add New Merchant </h1>
        </div>
        <form action="" className="add-form">
          <div className="add-input">
            <label htmlFor="">First Name</label> <div className="input"></div>
            <div className="input">
              <input
                type="text"
                name="fname"
                onChange={inputHandler}
                value={datas.fname || ""}
              />
              {errors.fname && <span className="error">{errors.fname}</span>}
            </div>
          </div>
          <div className="add-input">
            <label htmlFor="">Last Name</label> <div className="input"></div>
            <div className="input">
              <input
                type="text"
                name="lname"
                onChange={inputHandler}
                value={datas.lname || ""}
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
                value={datas.username || ""}
              />
              {errors.username && (
                <span className="error">{errors.username}</span>
              )}
            </div>
          </div>
          <div className="add-input">
            <label htmlFor="">Category</label> <div className="input"></div>
            <div className="input">
              <input
                type="text"
                name="type"
                onChange={inputHandler}
                value={datas.type || ""}
              />
              {errors.type && <span className="error">{errors.type}</span>}
            </div>
          </div>
          <div className="add-input">
            <label htmlFor="">Address</label> <div className="input"></div>
            <div className="input">
              <input
                type="text"
                name="address"
                onChange={inputHandler}
                value={datas.address || ""}
              />
              {errors.address && (
                <span className="error">{errors.address}</span>
              )}
            </div>
          </div>
          <div className="add-input">
            <label htmlFor="">E-mail Adr</label> <div className="input"></div>
            <div className="input">
              <input
                type="text"
                name="email"
                onChange={inputHandler}
                value={datas.email || ""}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>
          <div className="add-input">
            <label htmlFor="">Phone No</label>{" "}
            <div className="input">
              <input
                type="number"
                name="phone"
                minLength={10}
                onChange={inputHandler}
                value={datas.phone || ""}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>
          <div className="add-input">
            <label htmlFor="">Image URL</label>{" "}
            <div className="input">
              <input
                type="text"
                name="imgurl"
                onChange={inputHandler}
                value={datas.imgurl || ""}
              />
              {errors.imgurl && <span className="error">{errors.imgurl}</span>}
            </div>
          </div>

          <div className="add-m-btn">
            <button
              onClick={(e) => {
                e.preventDefault();
                createMerchant(e);
              }}
            >
              Create Merchant
            </button>{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                setDatas({
                  fname: "",
                  lname: "",
                  type: "",
                  address: "",
                  email: "",
                  phone: "",
                  imgurl: "",
                });

                setErrors({
                  fname: "",
                  lname: "",
                  username: "",
                  type: "",
                  email: "",
                  address: "",
                  phone: "",
                  imgurl: "",
                });
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

export default AddNewMerchant;
