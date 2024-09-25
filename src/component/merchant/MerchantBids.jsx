import React, { useEffect, useState } from "react";
import MDashBoardNavbar from "./MNavbar";
import "../../CSS/dashboard.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getBidsByMerchantIdAsync,
  selectMerchantBids,
  deleteMerchantBidAsync,
} from "./merchantSilce"; // Assuming deleteBid is defined here

const MerchantBids = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mid } = useParams(); // mid from URL params
  const [bids, setBids] = useState([]);
  const merchantBids = useSelector(selectMerchantBids);

  // Fetch merchant bids when component mounts
  useEffect(() => {
    if (mid) {
      dispatch(getBidsByMerchantIdAsync(mid));
    } else {
      console.error("Merchant ID is undefined");
    } // Use the merchant ID from params
  }, [dispatch, mid]);

  // Set the bids from Redux state to local component state
  useEffect(() => {
    if (merchantBids) {
      setBids(merchantBids);
    }
  }, [merchantBids]);

  // Handle bid deletion
  const handleDelete = (bidId) => {
    const val = window.confirm("Are you sure you want to delete?");
    if (val) {
      dispatch(deleteMerchantBidAsync({ merchantId: mid, bidId })); // Dispatch delete action
      setBids(bids.filter((bid) => bid.bidId !== bidId)); // Update local state
      alert("Deleted Successfully");
    }
  };

  return (
    <>
      <MDashBoardNavbar />
      <div className="dashboard">
        <div className="list-top">
          <Link to={`/mDashBoard`}>
            <button>Back</button>
          </Link>
          <h1>Merchant Bids List</h1>
          <Link to={`/tobid/${mid}`}>
            <button>New Bids</button>
          </Link>
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
            {bids.map((ele) => (
              <tr key={ele.bidId} className="table-data">
                <td datatitle="Bid Id">{ele.bidId}</td>
                <td datatitle="Asset Type">{ele.assetType}</td>
                <td datatitle="Yearly Return">{ele.yearlyReturn}</td>
                <td datatitle="Holding Period">{ele.holdingPeriod}</td>
                <td datatitle="Ask">{ele.ask}</td>
                <td datatitle="Bid">{ele.bid}</td>
                <td datatitle="Status">{ele.status}</td>
                <td className="btn-action" datatitle="Action">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(ele.bidId);
                    }}
                  >
                    Delete
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

export default MerchantBids;
