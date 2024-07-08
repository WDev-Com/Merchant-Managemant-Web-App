import React, { useEffect, useState } from "react";
import "../../CSS/dashboard.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMerchantById,
  selectMerchant,
  updateBidStatus,
} from "../oprations/operationSlice";
import InchargeNavbar from "./inchargeNavbar";

const ViewMerchantBids = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const currMerchant = useSelector(selectMerchant);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (currMerchant.bids) {
      setBids(currMerchant.bids);
    }
  }, [currMerchant.bids]);

  useEffect(() => {
    if (id) {
      dispatch(getMerchantById(Number(id)));
    }
  }, [id, dispatch]);

  const handleAcceptBid = (merchantId, bidId) => {
    dispatch(updateBidStatus({ merchantId, bidId, status: "accepted" }));
    setBids((prevBids) =>
      prevBids.map((bid) =>
        bid.bidId === bidId ? { ...bid, status: "accepted" } : bid
      )
    );
  };

  const handleRejectBid = (merchantId, bidId) => {
    dispatch(updateBidStatus({ merchantId, bidId, status: "rejected" }));
    setBids((prevBids) =>
      prevBids.map((bid) =>
        bid.bidId === bidId ? { ...bid, status: "rejected" } : bid
      )
    );
  };

  return (
    <>
      <InchargeNavbar />
      <div className="dashboard">
        <div className="add-top">
          <Link to={`/merchantlist`}>
            <button>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
              Back
            </button>
          </Link>
          <h1>Merchant Bids List</h1>
          <h1>Merchant ID : {id} </h1>
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
              <tr key={bid.bidId} className="table-data">
                <td datatitle="Bid ID">{bid.bidId}</td>
                <td datatitle="Asset Type">{bid.assetType}</td>
                <td datatitle="ROI">{bid.yearlyReturn}</td>
                <td datatitle="Holding Period">{bid.holdingPeriod}</td>
                <td datatitle="Ask">{bid.ask}</td>
                <td datatitle="Bid">{bid.bid}</td>
                <td datatitle="Status">{bid.status}</td>
                <td datatitle="Action" className="btn-action">
                  <button
                    onClick={() => handleAcceptBid(currMerchant.id, bid.bidId)}
                  >
                    Accept
                  </button>
                  |
                  <button
                    onClick={() => handleRejectBid(currMerchant.id, bid.bidId)}
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
