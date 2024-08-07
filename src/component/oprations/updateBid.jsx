import React, { useEffect, useState } from "react";
import InchargeNavbar from "./inchargeNavbar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBidsById,
  getBidsById,
  updateBidReducer,
} from "./operationSlice";
import "../../CSS/operate-form.css";

const updateBidPage = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  let currBid = useSelector(selectBidsById);
  useEffect(() => {
    if (id) {
      dispatch(getBidsById(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currBid && currBid.bidId) {
      setBidData(currBid);
    }
  }, [currBid]);
  const [bidData, setBidData] = useState({
    bidId: currBid.bidId || "",
    assetType: currBid.assetType || "",
    yearlyReturn: currBid.yearlyReturn || 1,
    holdingPeriod: currBid.holdingPeriod || 1,
    ask: currBid.ask || 1,
  });

  const [errors, setErrors] = useState({
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

    if (!bidData.yearlyReturn.trim()) {
      errors.yearlyReturn = "Yearly Return is required";
      isValid = false;
    } else if (bidData.yearlyReturn <= 0) {
      errors.yearlyReturn = "Yearly Return Should be Greater than 1";
      isValid = false;
    }

    if (!bidData.holdingPeriod.trim()) {
      errors.holdingPeriod = "Holding Period is required";
      isValid = false;
    } else if (bidData.holdingPeriod <= 0) {
      errors.holdingPeriod = "Holding Period Should be Greater than 1";
      isValid = false;
    }

    if (!bidData.ask.trim()) {
      errors.ask = "Ask is required";
      isValid = false;
    } else if (bidData.ask <= 0) {
      errors.ask = "Ask Should be Greater than 1";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const updateBidMeth = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      dispatch(updateBidReducer(bidData));
      setBidData({
        bidId: "",
        assetType: "",
        yearlyReturn: "",
        holdingPeriod: "",
        ask: "",
      });
      alert("Bid Updated");
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
              <label htmlFor="assetType">Asset Type</label>
            </div>
            <div className="input">
              <input
                type="text"
                min="1"
                name="assetType"
                onChange={inputHandler}
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
