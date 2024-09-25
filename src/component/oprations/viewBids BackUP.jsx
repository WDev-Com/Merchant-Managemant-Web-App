import React, { useEffect, useState } from "react";
import "../../CSS/dashboard.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMerchantByIdAsync,
  selectCurrentMerchant,
} from "../oprations/operationSlice";
import InchargeNavbar from "./inchargeNavbar";
import {
  changeBidStatusAsync,
  clearCurrentMerchantBids,
  getBidsByMerchantIdAsync,
  selectMerchantBids,
} from "../merchant/merchantSilce";

const ViewMerchantBids = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mid } = useParams();
  // console.log(mid);
  const currMerchant = useSelector(selectCurrentMerchant);
  const merchantBIDS = useSelector(selectMerchantBids);
  const [bids, setBids] = useState([]);
  // console.log(merchantBIDS);
  useEffect(() => {
    if (merchantBIDS) {
      setBids(merchantBIDS);
    }
  }, [merchantBIDS]);

  useEffect(() => {
    if (mid) {
      dispatch(fetchMerchantByIdAsync(mid));
      dispatch(getBidsByMerchantIdAsync(mid));
    }
  }, [mid, dispatch]);

  const handleBidStatusChange = (merchantId, bidId, status) => {
    dispatch(changeBidStatusAsync({ merchantId, bidId, status }));
    setBids((prevBids) =>
      prevBids.map((bid) => (bid.bidId === bidId ? { ...bid, status } : bid))
    );
  };
  function handleClearBids() {
    dispatch(clearCurrentMerchantBids());
  }
  return (
    <>
      <InchargeNavbar />
      <div className="dashboard">
        <div className="add-top">
          <Link to={`/merchantlist`}>
            <button onClick={handleClearBids}>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
              Back
            </button>
          </Link>
          <h1>Merchant Bids List</h1>
          <h1>Merchant ID : {mid} </h1>
        </div>
        <table className="list-table">
          <thead>
            <tr className="heading">
              <th>Bid Id</th>
              <th>Asset Type</th>
              <th>Yearly Return</th>
              <th>Holding Period</th>
              <th>Ask</th>
              <th>Bid</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => (
              <tr key={bid._id} className="table-data">
                <td datatitle="Bid ID">{bid.bidId}</td>
                <td datatitle="Asset Type">{bid.assetType}</td>
                <td datatitle="ROI">{bid.yearlyReturn}</td>
                <td datatitle="Holding Period">{bid.holdingPeriod}</td>
                <td datatitle="Ask">{bid.ask}</td>
                <td datatitle="Bid">{bid.bid}</td>
                <td datatitle="Status">{bid.status}</td>
                <td datatitle="Action" className="btn-action">
                  <button
                    onClick={() =>
                      handleBidStatusChange(
                        currMerchant._id,
                        bid.bidId,
                        "accepted"
                      )
                    }
                  >
                    Accept
                  </button>
                  |
                  <button
                    onClick={() =>
                      handleBidStatusChange(
                        currMerchant._id,
                        bid.bidId,
                        "rejected"
                      )
                    }
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewMerchantBids;
