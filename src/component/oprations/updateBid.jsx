import React, { useEffect, useState } from "react";
import InchargeNavbar from "./inchargeNavbar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../../CSS/operate-form.css";
import {
  fetchBidByIdAsync,
  selectCurrentBid,
  updateBidAsync,
} from "./operationSlice";

const updateBidPage = () => {
  let { BidID } = useParams();
  // console.log(BidID);
  let dispatch = useDispatch();
  let currBid = useSelector(selectCurrentBid);
  // console.log(currBid);
  useEffect(() => {
    if (BidID) {
      dispatch(fetchBidByIdAsync(BidID));
    }
  }, [BidID, dispatch]);

  useEffect(() => {
    if (currBid && currBid._id) {
      setBidData(currBid);
    }
  }, [currBid]);
  const [bidData, setBidData] = useState({
    assetName: currBid.assetName || "",
    assetType: currBid.assetType || "",
    yearlyReturn: currBid.yearlyReturn || 1,
    holdingPeriod: currBid.holdingPeriod || 1,
    ask: currBid.ask || 1,
  });

  const [errors, setErrors] = useState({
    assetName: "",
    assetType: "",
    yearlyReturn: "",
    holdingPeriod: "",
    ask: "",
  });

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
    }
    if (!bidData.yearlyReturn) {
      errors.yearlyReturn = "Yearly Return is required";
      isValid = false;
    } else if (bidData.yearlyReturn <= 0) {
      errors.yearlyReturn = "Yearly Return Should be Greater than 1";
      isValid = false;
    }

    if (!bidData.holdingPeriod) {
      errors.holdingPeriod = "Holding Period is required";
      isValid = false;
    } else if (bidData.holdingPeriod <= 0) {
      errors.holdingPeriod = "Holding Period Should be Greater than 1";
      isValid = false;
    }

    if (!bidData.ask) {
      errors.ask = "Ask is required";
      isValid = false;
    } else if (bidData.ask <= 0) {
      errors.ask = "Ask Should be Greater than 1";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
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

  const updateBidMeth = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      dispatch(updateBidAsync({ bidId: currBid._id, updatedData: bidData }));
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
          <h1>Update Bid</h1>
        </div>
        <form className="add-form">
          <div className="add-input">
            <div className="input-label">
              <label htmlFor="assetName">Asset Name</label>
            </div>
            <div className="input">
              <input
                type="text"
                min="1"
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
                onBlur={handleBlur}
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
            <button
              onClick={(e) => {
                updateBidMeth(e);
              }}
            >
              Update Bid
            </button>
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

export default updateBidPage;
