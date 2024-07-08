import React from "react";
import InchargeNavbar from "./inchargeNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeBid, selectBids } from "./operationSlice";

const bidslist = () => {
  let data = useSelector(selectBids);
  // console.log(data);
  let navigate = useNavigate();
  let dispatch = useDispatch();
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
                <td datatitle="ROI">{bid.yearlyReturn}</td>
                <td datatitle="Holding Period">{bid.holdingPeriod}</td>
                <td datatitle="Ask">{bid.ask}</td>
                <td datatitle="Action" className="btn-action">
                  <button
                    onClick={() => {
                      navigate(`/Updatebid/${bid.bidId}`);
                    }}
                  >
                    Edit
                  </button>
                  |
                  <button
                    onClick={(e) => {
                      let val = confirm("Are you sure you want to delete this");
                      if (val) {
                        dispatch(removeBid(bid.bidId));
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
      </div>
    </>
  );
};

export default bidslist;
