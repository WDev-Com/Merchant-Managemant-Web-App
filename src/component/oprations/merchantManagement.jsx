import React, { useEffect, useState } from "react";
import "../../CSS/dashboard.css";
import InchargeNavbar from "./inchargeNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPaginatedMerchants,
  fetchMerchantsByPaginationAsync,
  selectMerchantTotalCount,
  deleteMerchantAsync,
} from "./operationSlice";
import Pagination from "../common/Pagination";

const MerchantManagement = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paginatedMerchants = useSelector(selectPaginatedMerchants);
  const totalMerchants = useSelector(selectMerchantTotalCount);
  // console.log(paginatedMerchants);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      dispatch(
        fetchMerchantsByPaginationAsync({
          page: currentPage,
          limit: itemsPerPage,
        })
      );
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // console.log(paginatedMerchants);

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
        {loading ? (
          <p>Loading merchants...</p>
        ) : (
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
              {paginatedMerchants.map((ele, ind) => (
                <tr key={ele._id + ind} className="table-data">
                  <td datatitle="ID">{ele._id}</td>
                  <td datatitle="Name">{`${ele.name}`}</td>
                  <td datatitle="Username">{ele.username}</td>
                  <td datatitle="Category">{ele.category}</td>
                  <td datatitle="Email">{ele.email}</td>
                  <td datatitle="Phone">{ele.phone}</td>
                  <td datatitle="Address">{ele.address}</td>
                  <td datatitle="Action" className="btn-action">
                    <button
                      onClick={() => navigate(`/updatemerchant/${ele._id}`)}
                    >
                      Edit
                    </button>
                    |
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this")) {
                          dispatch(deleteMerchantAsync(ele._id));
                        }
                      }}
                    >
                      Delete
                    </button>
                    |
                    <button
                      onClick={() => navigate(`/viewMerchantbids/${ele._id}`)}
                    >
                      Bids
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination
          totalItems={totalMerchants}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default MerchantManagement;
