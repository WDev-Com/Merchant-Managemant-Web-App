import React, { useState } from "react";
import "../../CSS/operate-form.css";
import InchargeNavbar from "./inchargeNavbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMerchantAsync } from "./operationSlice";

const AddNewMerchant = () => {
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

  const imageHandler = (event) => {
    let { name, value, type, files } = event.target;

    if (type === "file") {
      let file = files[0];
      if (file.size > 80 * 1024) {
        alert("Image size exceeds 80 KB");
        return;
      }

      let reader = new FileReader();
      reader.onloadend = () => {
        setDatas((preVal) => ({
          ...preVal,
          profileImg: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setDatas((preVal) => ({
        ...preVal,
        [name]: value,
      }));
    }
  };

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

  let dispatch = useDispatch();

  const createMerchant = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      let newData = { ...datas };
      delete newData.fname;
      delete newData.lname;
      newData["name"] = datas.fname + " " + datas.lname;
      // console.log(newData);
      dispatch(createMerchantAsync(newData));
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

    if (!datas.category.trim()) {
      errors.category = "Merchant Type is required";
      isValid = false;
    }

    if (!datas.profileImg.trim()) {
      errors.profileImg = "Image URL is required";
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
            <label htmlFor="category">Category</label>
            <div className="input">
              <select
                name="category"
                onChange={inputHandler}
                value={datas.category || ""}
              >
                <option value="">Select a category</option>
                <option value="Inventory Management">
                  Inventory Management
                </option>
                <option value="Financial Assets">Financial Assets</option>
                <option value="Property">Property</option>
                <option value="Digital Assets">Digital Assets</option>
                <option value="Vendor and Supplier">Vendor and Supplier</option>
              </select>
              {errors.category && (
                <span className="error">{errors.category}</span>
              )}
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
            <label htmlFor="">Image URL</label>
            <div className="input">
              <input
                type="file"
                accept="image/*"
                name="profileImg"
                onChange={imageHandler}
              />
              {errors.profileImg && (
                <span className="error">{errors.profileImg}</span>
              )}
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
                  category: "",
                  address: "",
                  email: "",
                  phone: "",
                  profileImg: "",
                });

                setErrors({
                  fname: "",
                  lname: "",
                  username: "",
                  category: "",
                  email: "",
                  address: "",
                  phone: "",
                  profileImg: "",
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
