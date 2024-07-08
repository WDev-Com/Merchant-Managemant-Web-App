import React, { useState } from "react";
import "../../CSS/pagination.css";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <span
          key={i}
          className={`count ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <button
        id="pageleft"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
      {renderPageNumbers()}
      <button
        id="pageright"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
