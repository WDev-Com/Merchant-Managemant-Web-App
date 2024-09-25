import React, { useState } from "react";
import InchargeNavbar from "./inchargeNavbar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../CSS/operate-form.css";
import { createNewBidAsync } from "./operationSlice";

const AddNewBids = () => {
  const [bidData, setBidData] = useState({
    assetName: "",
    assetType: "",
    yearlyReturn: 0,
    holdingPeriod: 0,
    ask: 0,
  });

  const [errors, setErrors] = useState({
    assetName: "",
    assetType: "",
    yearlyReturn: "",
    holdingPeriod: "",
    ask: "",
  });

  const dispatch = useDispatch();

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setBidData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    let error = "";
    if (name === "assetType" && !value.trim()) {
      error = "Asset Type is required";
    } else if (name === "assetName" || !value.trim()) {
      error = "Asset Name is required";
    } else if (name === "holdingPeriod") {
      if (!value.trim()) {
        error = "Holding Period is required";
      } else if (value <= 0) {
        error = "Holding Period should be greater than 0";
      }
    } else if (name === "holdingPeriod") {
      if (!value.trim()) {
        error = "Holding Period is required";
      } else if (value <= 0) {
        error = "Holding Period should be greater than 0";
      }
    } else if (name === "ask") {
      if (!value.trim()) {
        error = "Ask is required";
      } else if (value <= 0) {
        error = "Ask should be greater than 0";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateInputs = () => {
    let isValid = true;
    let errors = {};
    if (!bidData.assetType.trim()) {
      errors.assetType = "Asset Type is required";
      isValid = false;
    }

    if (!bidData.yearlyReturn.trim()) {
      errors.yearlyReturn = "Yearly Return is required";
      isValid = false;
    } else if (bidData.yearlyReturn <= 0) {
      errors.yearlyReturn = "Yearly Return should be greater than 0";
      isValid = false;
    }

    if (!bidData.holdingPeriod.trim()) {
      errors.holdingPeriod = "Holding Period is required";
      isValid = false;
    } else if (bidData.holdingPeriod <= 0) {
      errors.holdingPeriod = "Holding Period should be greater than 0";
      isValid = false;
    }

    if (!bidData.ask.trim()) {
      errors.ask = "Ask is required";
      isValid = false;
    } else if (bidData.ask <= 0) {
      errors.ask = "Ask should be greater than 0";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const createBid = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      let newBid = { ...bidData };
      // console.log(newBid);
      dispatch(createNewBidAsync(newBid));
      setBidData({
        assetName: "",
        assetType: "",
        yearlyReturn: "",
        holdingPeriod: "",
        ask: "",
      });
    }
  };

  return (
    <>
      <InchargeNavbar />
      <div className="add-opreation">
        <div className="add-top">
          <Link to="/bidslist">
            <button>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
              Back
            </button>
          </Link>
          <h1>Add New Bid</h1>
        </div>
        <form className="add-form">
          <div className="add-input">
            <div className="input-label">
              <label htmlFor="assetName">Asset Name</label>
            </div>
            <div className="input">
              <input
                type="text"
                name="assetName"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={bidData.assetName}
              />
              {errors.assetType && (
                <span className="error">{errors.assetType}</span>
              )}
            </div>
          </div>
          <div className="add-input">
            <div className="input-label">
              <label htmlFor="assetType">Asset Type</label>
            </div>
            <div className="input">
              <input
                type="text"
                name="assetType"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={bidData.assetType}
              />
              {errors.assetType && (
                <span className="error">{errors.assetType}</span>
              )}
            </div>
          </div>
          <div className="add-input">
            <div className="input-label">
              <label htmlFor="yearlyReturn">ROI %</label>
            </div>
            <div className="input">
              <input
                type="number"
                name="yearlyReturn"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={bidData.yearlyReturn}
              />
              {errors.yearlyReturn && (
                <span className="error">{errors.yearlyReturn}</span>
              )}
            </div>
          </div>
          <div className="add-input">
            <div className="input-label">
              <label htmlFor="holdingPeriod">Holding Years</label>
            </div>
            <div className="input">
              <input
                type="number"
                name="holdingPeriod"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={bidData.holdingPeriod}
              />
              {errors.holdingPeriod && (
                <span className="error">{errors.holdingPeriod}</span>
              )}
            </div>
          </div>
          <div className="add-input">
            <div className="input-label">
              <label htmlFor="ask">Ask</label>
            </div>
            <div className="input">
              <input
                type="number"
                name="ask"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={bidData.ask}
              />
              {errors.ask && <span className="error">{errors.ask}</span>}
            </div>
          </div>

          <div className="add-m-btn">
            <button onClick={createBid}>Create Bid</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setBidData({
                  bidId: "",
                  assetType: "",
                  yearlyReturn: "",
                  holdingPeriod: "",
                  ask: "",
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

export default AddNewBids;
