import React, { useEffect, useState } from "react";
import "../../CSS/dashboard.css";
import InchargeNavbar from "./inchargeNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeMerchant,
  getMerchantByPage,
  selectPaginatedMerchants,
  selectMerchants,
} from "./operationSlice";
import Pagination from "../common/Pagination";

const MerchantManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paginatedMerchants = useSelector(selectPaginatedMerchants);
  const totalMerchants = useSelector(selectMerchants);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getMerchantByPage({ page: currentPage, perPage: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <InchargeNavbar />
      <div className="dashboard">
        <div className="list-top">
          <h1>Merchant List</h1>
          <Link to={"/addMerchant"}>
            <button>+ Add Merchant</button>
          </Link>
        </div>
        <table className="list-table">
          <thead>
            <tr className="heading">
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Category</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMerchants.map((ele) => (
              <tr key={ele.id} className="table-data">
                <td datatitle="ID">{ele.id}</td>
                <td datatitle="Name">{`${ele.fname.toUpperCase()} ${ele.lname.toUpperCase()}`}</td>
                <td datatitle="Username">{ele.username}</td>
                <td datatitle="Category">{ele.type}</td>
                <td datatitle="Email">{ele.email}</td>
                <td datatitle="Phone">{ele.phone}</td>
                <td datatitle="Address">{ele.address}</td>
                <td datatitle="Action" className="btn-action">
                  <button onClick={() => navigate(`/updatemerchant/${ele.id}`)}>
                    Edit
                  </button>
                  |
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this")) {
                        dispatch(removeMerchant(ele.id));
                      }
                    }}
                  >
                    Delete
                  </button>
                  |
                  <button
                    onClick={() => navigate(`/viewMerchantbids/${ele.id}`)}
                  >
                    Bids
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalItems={totalMerchants.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default MerchantManagement;
