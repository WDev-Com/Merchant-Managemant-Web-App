import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../../CSS/operate-form.css";

import MDashBoardNavbar from "../merchant/MNavbar";
import {
  fetchBidByIdAsync,
  selectCurrentBid,
  selectCurrentMerchant,
} from "../oprations/operationSlice";
import { confirmBidAsync } from "../merchant/merchantSilce";

const BiddingForm = () => {
  let { mid, bid } = useParams();
  // console.log(mid);
  // console.log(bid);
  let dispatch = useDispatch();
  let currBid = useSelector(selectCurrentBid);
  // console.log(currBid);
  const [bidData, setBidData] = useState({
    merchantId: "",
    bidId: "",
    assetType: "",
    yearlyReturn: 0,
    holdingPeriod: 0,
    ask: 0,
    bid: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    bid: "",
  });

  useEffect(() => {
    if (bid) {
      dispatch(fetchBidByIdAsync(bid));
    }
  }, [bid, dispatch]);

  useEffect(() => {
    if (currBid && currBid._id) {
      setBidData((prevData) => ({
        ...prevData,
        ...currBid,
        merchantId: mid,
        bidId: currBid._id,
        status: currBid.status || "Under Review",
      }));
    }
  }, [currBid, mid]);

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

    if (name === "bid") {
      if (!value) {
        error = "Bid is required";
      } else if (Number(value) <= 0) {
        error = "Bid should be greater than 0";
      } else if (Number(value) < bidData.ask) {
        error = "Bid should be greater than ask";
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

    if (!bidData.bid) {
      errors.bid = "Bid is required";
      isValid = false;
    } else if (Number(bidData.bid) <= 0) {
      errors.bid = "Bid should be greater than 0";
      isValid = false;
    } else if (Number(bidData.bid) < bidData.ask) {
      errors.bid = "Bid should be greater than ask";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const addBid = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      // console.log(bidData);
      dispatch(confirmBidAsync({ bidData }));
      setBidData({
        assetName: "",
        assetType: "",
        bidId: "",
        yearlyReturn: 0,
        holdingPeriod: 0,
        ask: 0,
        bid: "",
        status: "",
      });
    }
  };

  return (
    <>
      <MDashBoardNavbar />
      <div className="add-opreation">
        <div className="add-top">
          <Link to={`/mDashBoard`}>
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
              <label htmlFor="bidId">Bid ID</label>
            </div>
            <div className="input">
              <input
                type="text"
                name="bidId"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={bidData._id || ""}
                readOnly
              />
            </div>
          </div>
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
                value={bidData.assetName || ""}
                readOnly
              />
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
                value={bidData.assetType || ""}
                readOnly
              />
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
                value={bidData.yearlyReturn || 0}
                readOnly
              />
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
                value={bidData.holdingPeriod || 0}
                readOnly
              />
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
                value={bidData.ask || 0}
                readOnly
              />
            </div>
          </div>
          <div className="add-input">
            <div className="input-label">
              <label htmlFor="bid">Bid</label>
            </div>
            <div className="input">
              <input
                type="number"
                name="bid"
                onChange={inputHandler}
                onBlur={handleBlur}
                value={bidData.bid || ""}
              />
              {errors.bid && <span className="error">{errors.bid}</span>}
            </div>
          </div>

          <div className="add-m-btn">
            <button onClick={addBid}>Confirm</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BiddingForm;
