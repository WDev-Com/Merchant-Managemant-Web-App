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

import BidsComponent from "./bidsComponent";

const ViewMerchantBids = () => {
  const { mid } = useParams();
  const dispatch = useDispatch();
  const currMerchant = useSelector(selectCurrentMerchant);
  const merchantBids = useSelector(selectMerchantBids);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (merchantBids) {
      setBids(merchantBids);
    }
  }, [merchantBids]);

  useEffect(() => {
    if (mid) {
      dispatch(fetchMerchantByIdAsync(mid));
      dispatch(getBidsByMerchantIdAsync(mid));
    }
  }, [mid, dispatch]);

  const handlePageChange = (page) => {
    // Handle page change logic here if necessary
  };

  const handleEdit = (bidId) => {
    // Handle bid edit logic here
  };

  const handleBidStatusChange = (merchantId, bidId, status) => {
    dispatch(changeBidStatusAsync({ merchantId, bidId, status }));
    setBids((prevBids) =>
      prevBids.map((bid) => (bid.bidId === bidId ? { ...bid, status } : bid))
    );
  };

  const handleDelete = (bidId) => {
    // Handle bid delete logic here if necessary
  };

  return (
    <>
      <div className="add-top">
        <Link to={`/merchantlist`}>
          <button onClick={() => dispatch(clearCurrentMerchantBids())}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
            Back
          </button>
        </Link>
        <h1>Merchant Bids List</h1>
        <h1>Merchant ID : {mid} </h1>
      </div>
      <BidsComponent
        data={bids}
        totalItems={bids.length} // Since all bids are already loaded
        itemsPerPage={10} // Display all bids or set your preferred limit
        currentPage={1} // Static as no pagination in this case
        onPageChange={handlePageChange}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        showAddNewButton={false} // Hide the "Add New" button for this view
      />
    </>
  );
};

export default ViewMerchantBids;
