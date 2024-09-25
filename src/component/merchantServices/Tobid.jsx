import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MDashBoardNavbar from "../merchant/MNavbar";
import "../../CSS/dashboard.css";
import {
  fetchAllBidsByPaginationAsync,
  selectBids,
  selectBidsTotalCount,
} from "../oprations/operationSlice";
import Pagination from "../common/Pagination";
const ToBid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  let { id } = useParams();
  return (
    <>
      <MDashBoardNavbar />
      <div className="dashboard">
        <div className="list-top">
          <h1>Bid From List</h1>
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
                        navigate(`/biddingForm/${id}/${bid._id}`);
                      }}
                    >
                      Bid
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

export default ToBid;
{
  /**
  
 
  */
}
