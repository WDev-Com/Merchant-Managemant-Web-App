const API_BASE_URL = "http://localhost:8081/admin";
import { toast } from "react-toastify";
// 1. Add Merchant ## DONE
export const addMerchant = (merchantData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addMerchant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merchantData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data); // Log the entire response for debugging

        if (data.error) {
          // Display error message from the server
          toast.error(`Error: ${data.error}`);
        } else {
          toast.error(`HTTP error! status: ${response.status}`);
        }

        return reject(data);
      }

      toast.success("Merchant Added Successfully");
      resolve(data);
    } catch (error) {
      console.error("Error adding merchant:", error);
      toast.error("An unexpected error occurred");
      reject(error);
    }
  });
};
// 2. Add New Bid  ## DONE
export const addNewBid = (bidData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addNewBid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bidData),
      });

      const data = await response.json();

      if (!response.ok) {
        // console.log(data);
        if (data.error) {
          // Display error message from the server
          toast.error(`Error: ${data.error}`);
        } else {
          toast.error(`HTTP error! status: ${response.status}`);
        }
        return reject(data);
      }
      if (response.ok) {
        toast.success("Bid Added Successfully");
      }
      resolve(data);
    } catch (error) {
      console.error("Error adding bid:", error);
      toast.error("An unexpected error occurred");
      reject(error);
    }
  });
};
// 3. Delete Merchant By ID ##DONE
export const deleteMerchantById = (merchantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(merchantId);
      const response = await fetch(
        `${API_BASE_URL}/removeMercant/${merchantId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        toast.error(`HTTP error! status: ${response.status}`);
      }
      if (response.ok) {
        toast.success("Successfully Deleted");
      }
      resolve(merchantId);
    } catch (error) {
      console.error("Error deleting merchant:", error);
      reject(error);
    }
  });
};

// 4. Remove Bid By ID ## DONE
export const removeBidById = (bidId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_BASE_URL}/removeBid/${bidId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error(`HTTP error! status: ${response.status}`);
      }
      if (response.ok) {
        toast.success("Successfully Deleted");
      }
      resolve(bidId);
    } catch (error) {
      console.error("Error removing bid:", error);
      reject(error);
    }
  });
};

// 5. Update Merchant By ID ## Done
export const updateMerchantById = (merchantId, updatedData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(merchantId);
      // console.log(updatedData);

      const response = await fetch(
        `${API_BASE_URL}/updateMerchant/${merchantId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        toast.error(`HTTP error! status: ${response.status}`);
      }
      if (response.ok) {
        toast.success("Successfully Updated");
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error("Error updating merchant:", error);
      reject(error);
    }
  });
};

// 6. Update Bid By ID  ## DONE
export const updateBidById = (bidId, updatedData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(bidId);
      // console.log(updatedData);
      const response = await fetch(`${API_BASE_URL}/updateBid/${bidId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        toast.error(`HTTP error! status: ${response.status}`);
      }
      if (response.ok) {
        toast.success("Successfully Updated");
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error("Error updating bid:", error);
      reject(error);
    }
  });
};

// 7. Get Merchant By ID  ## Done
export const getMerchantById = (merchantId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/getMerchantById/${merchantId}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        toast.error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error("Error fetching merchant by ID:", error);
      reject(error);
    }
  });
};

// 8. Get Merchants By Pagination ## DONE
export const getMerchantsByPagination = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/getAllMerchant?page=${page}&limit=${limit}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Correctly retrieve the total count if this endpoint is meant to return it
      const totalCount = response.headers.get("X-Total-Merchant-Count");
      // console.log("Total Count from Header:", totalCount);
      const data = await response.json();
      resolve({ data, totalCount });
    } catch (error) {
      console.error("Error fetching merchants by pagination:", error);
      reject(error);
    }
  });
};

// 9. Get Bid By ID # DONE
export const getBidById = (bidId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getBidById/${bidId}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error("Error fetching bid by ID:", error);
      reject(error);
    }
  });
};

// 10. Get All Bids By Pagination  ## DONE
export const getAllBidsByPagination = (page = 1, limit = 10) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/getAllBids?page=${page}&limit=${limit}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Correctly retrieve the total count if this endpoint is meant to return it
      const totalCount = response.headers.get("X-Total-Bids-Count");
      const data = await response.json();
      resolve({ data, totalCount });
    } catch (error) {
      console.error("Error fetching bids by pagination:", error);
      reject(error);
    }
  });
};

// 11. Update Bid Status in Merchant's My-Bids Collection
export const updateBidStatus = (merchantId, bidId, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/updateBidStatus?merchantId=${merchantId}&bidId=${bidId}&status=${status}`,
        {
          method: "PATCH",
        }
      );
      if (!response.ok) {
        toast.error(`HTTP error! status: ${response.status}`);
      }
      if (response.ok) {
        toast.success("Bid Status Successfully Updated");
      }
      // console.log({ merchantId, bidId, status });
      resolve({ merchantId, bidId, status });
    } catch (error) {
      console.error("Error updating bid status:", error);
      reject(error);
    }
  });
};
