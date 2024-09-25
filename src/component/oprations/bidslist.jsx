import React, { useEffect, useState } from "react";
import InchargeNavbar from "./inchargeNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBidAsync,
  fetchAllBidsByPaginationAsync,
  selectBids,
  selectBidsTotalCount,
} from "./operationSlice";
import Pagination from "../common/Pagination";

const bidslist = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  /// Fetch Bids By Pagination
  const data = useSelector(selectBids);
  // console.log(data);
  const totalBids = useSelector(selectBidsTotalCount);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(
      fetchAllBidsByPaginationAsync({
        page: currentPage,
        limit: itemsPerPage,
      })
    );
  }, [dispatch, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <InchargeNavbar />
      <div className="dashboard">
        <div className="list-top">
          <h1>List of Asset</h1>
          <Link to={"/addNewbid"}>
            <button>Add New</button>
          </Link>
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
                  <td datatitle="Action" className="btn-action">
                    <button
                      onClick={() => {
                        navigate(`/Updatebid/${bid._id}`);
                      }}
                    >
                      Edit
                    </button>
                    |
                    <button
                      onClick={(e) => {
                        let val = confirm(
                          "Are you sure you want to delete this?"
                        );
                        if (val) {
                          dispatch(deleteBidAsync(bid._id));
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          totalItems={totalBids}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default bidslist;
