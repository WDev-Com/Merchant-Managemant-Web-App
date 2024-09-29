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

  const validateInputs = () => {
    let isValid = true;
    let errors = {};

    if (!bidData.assetType.trim()) {
      errors.assetType = "Asset Type is required";
      isValid = false;
    }

    if (!bidData.assetName.trim()) {
      errors.assetName = "Asset Name is required";
      isValid = false;
    }

    if (!bidData.yearlyReturn) {
      errors.yearlyReturn = "Yearly Return is required";
      isValid = false;
    } else if (bidData.yearlyReturn <= 0) {
      errors.yearlyReturn = "Yearly Return should be greater than 0";
      isValid = false;
    }

    if (!bidData.holdingPeriod) {
      errors.holdingPeriod = "Holding Period is required";
      isValid = false;
    } else if (bidData.holdingPeriod <= 0) {
      errors.holdingPeriod = "Holding Period should be greater than 0";
      isValid = false;
    }

    if (!bidData.ask) {
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
                value={bidData.assetName}
              />
              {errors.assetName && (
                <span className="error">{errors.assetName}</span>
              )}
            </div>
          </div>
          <div className="add-input">
            <div className="input-label">
              <label htmlFor="assetType">Asset Type</label>
            </div>
            <div className="input">
              <select
                name="assetType"
                onChange={inputHandler}
                value={bidData.assetType}
              >
                <option value="">Select an asset type</option>
                <option value="Raw Materials Stock">Raw Materials Stock</option>
                <option value="Investment Portfolio">
                  Investment Portfolio
                </option>
                <option value="Real Estate">Real Estate</option>
                <option value="Digital Holdings">Digital Holdings</option>
                <option value="Supplier Contracts">Supplier Contracts</option>
              </select>
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
