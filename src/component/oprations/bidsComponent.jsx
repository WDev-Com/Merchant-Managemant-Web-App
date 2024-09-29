import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";

const BidsComponent = ({
  data,
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  handleEdit,
  handleDelete,
  handleAccept,
  handleReject,
  showAddNewButton = true,
}) => {
  let navigate = useNavigate();
  return (
    <>
      <div className="dashboard">
        <div className="list-top">
          <h1>List of Asset</h1>
          {showAddNewButton && (
            <Link to={"/addNewbid"}>
              <button>Add New</button>
            </Link>
          )}
        </div>
        <table className="list-table">
          <thead>
            <tr className="heading">
              <th>Sr No</th>
              <th>Bid Id</th>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Yearly Return</th>
              <th>Holding Period</th>
              <th>Ask</th>
              <th>Actions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((bid, index) => (
                <tr key={bid._id} className="table-data">
                  <td datatitle="Sr No">{index + 1}</td>
                  <td datatitle="Bid ID">{bid._id}</td>
                  <td datatitle="Asset Name">{bid.assetName}</td>
                  <td datatitle="Asset Type">{bid.assetType}</td>
                  <td datatitle="ROI">{bid.yearlyReturn}</td>
                  <td datatitle="Holding Period">{bid.holdingPeriod}</td>
                  <td datatitle="Ask">{bid.ask}</td>
                  <td datatitle="Status">{bid.status}</td>
                  <td datatitle="Action" className="btn-action">
                    {handleEdit && (
                      <button onClick={() => handleEdit(bid._id)}>Edit</button>
                    )}
                    {handleDelete && (
                      <button onClick={() => handleDelete(bid._id)}>
                        Delete
                      </button>
                    )}
                    {handleAccept && (
                      <button
                        onClick={() =>
                          handleAccept(bid.merchantId, bid.bidId, "accepted")
                        }
                      >
                        Accept
                      </button>
                    )}
                    {handleReject && (
                      <button
                        onClick={() =>
                          handleReject(bid.merchantId, bid.bidId, "rejected")
                        }
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default BidsComponent;
