import React from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectBids } from "../oprations/operationSlice";
import MDashBoardNavbar from "../merchant/MNavbar";
import "../../CSS/dashboard.css";
const ToBid = () => {
  let data = useSelector(selectBids);
  // console.log(data);
  let navigate = useNavigate();
  let dispatch = useDispatch();
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
              <th>Bid Id</th>
              <th>Asset Type</th>
              <th>Yearly Return</th>
              <th>Holding Period</th>
              <th>Ask</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((bid) => (
              <tr key={bid.bidId} className="table-data">
                <td datatitle="Bid ID">{bid.bidId}</td>
                <td datatitle="Asset Type">{bid.assetType}</td>
                <td datatitle="Yearly Retrun">{bid.yearlyReturn}</td>
                <td datatitle="Holding Period">{bid.holdingPeriod}</td>
                <td datatitle="Ask">{bid.ask}</td>
                <td datatitle="Action" className="btn-action">
                  <button
                    onClick={() => {
                      navigate(`/biddingForm/${id}/${bid.bidId}`);
                    }}
                  >
                    Bid
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

export default ToBid;
