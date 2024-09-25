import React, { useEffect } from "react";
import MDashBoardNavbar from "./MNavbar";
import "../../CSS/merchantProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { selectUserInfo } from "../auth/Authslice";
import {
  getMerchantByUsernameAsync,
  selectCurrMerchant,
} from "../merchant/merchantSilce";
const navLinks = [
  { to: "/#home", text: "Home" },
  { to: "/merchantlist", text: "Merchant List" },
  { to: "/bidslist", text: "Bids List" },
];
const merchantDashboard = () => {
  // let { mid } = useParams();
  const dispatch = useDispatch();
  const currMerchant = useSelector(selectCurrMerchant);
  // console.log(currMerchant);
  const userInfo = useSelector(selectUserInfo);
  useEffect(() => {
    if (userInfo.username) {
      dispatch(getMerchantByUsernameAsync(userInfo.username));
    }
  }, [userInfo.username, dispatch]);
  // console.log(currMerchant._id);
  return (
    <>
      <MDashBoardNavbar />
      {!currMerchant ? (
        <div>Loading ....</div>
      ) : (
        <div className="main-container">
          <div className="list-top">
            <h1>Merchant Profile</h1>
            <Link to={`/ourbids/${currMerchant._id}`}>
              <button>Our Bids</button>
            </Link>
          </div>
          {currMerchant == null ? null : (
            <div className="profile-card">
              <div className="up-section">
                <img src={currMerchant.profileImg} alt="" />
                <div className="name-group">
                  <p>Name : {currMerchant.name}</p>
                  <p>Type : {currMerchant.category}</p>
                </div>
              </div>
              <div className="info-details">
                <p>Address : {currMerchant.address}</p>
                <p>Phone : {currMerchant.phone}</p>
                <p>Email : {currMerchant.email}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default merchantDashboard;
