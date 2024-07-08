import React, { useEffect } from "react";
import MDashBoardNavbar from "./MNavbar";
import "../../CSS/merchantProfile.css";
import { getMerchantById, selectMerchant } from "../oprations/operationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const navLinks = [
  { to: "/#home", text: "Home" },
  { to: "/merchantlist", text: "Merchant List" },
  { to: "/bidslist", text: "Bids List" },
];
const merchantDashboard = () => {
  let { mid } = useParams();
  const dispatch = useDispatch();
  const currMerchant = useSelector(selectMerchant);

  useEffect(() => {
    if (mid) {
      dispatch(getMerchantById(Number(mid)));
    }
  }, [mid, dispatch]);
  return (
    <>
      <MDashBoardNavbar />
      <div className="main-container">
        <div className="list-top">
          <h1>Merchant Profile</h1>
          <Link to={`/ourbids/${mid}`}>
            <button>Our Bids</button>
          </Link>
        </div>
        <div className="profile-card">
          <div className="up-section">
            <img src={currMerchant.imgurl} alt="" />
            <div className="name-group">
              <p>Name : {currMerchant.fname + " " + currMerchant.lname}</p>
              <p>Type : {currMerchant.type}</p>
            </div>
          </div>
          <div className="info-details">
            <p>Address : {currMerchant.address}</p>
            <p>Phone : {currMerchant.phone}</p>
            <p>Email : {currMerchant.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default merchantDashboard;
