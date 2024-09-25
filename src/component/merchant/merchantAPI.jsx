import { toast } from "react-toastify";

////////////////////// USED
export function getMerchantByUsername(username) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8081/merchant/getMerchantByUsername?username=${username}`
      );
      const data = await response.json();
      //   console.log("API response: ", data); // Log full response from the API
      if (response.ok) {
        resolve(data); // Resolve with merchant data
      } else {
        reject(data.error || "Failed to get merchant by username"); // Reject on failure
      }
    } catch (error) {
      reject(error.message); // Reject in case of error
    }
  });
}

export function getBidsByMerchantId(merchantId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8081/merchant/getMyBids?merchantId=${merchantId}`
      );
      const data = await response.json();
      //   console.log(data);
      if (response.ok) {
        // console.log(data);
        resolve(data); // Resolve with bid data
      }
      if (!response.ok) {
        toast.error("No Bid Exit");
        reject(data.error || "Failed to fetch bids"); // Reject with error message
      }
    } catch (error) {
      reject(error.message); // Handle any errors
    }
  });
}

export function deleteMerchantBid(merchantId, bidId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8081/merchant/deleteMerchantBid?merchantId=${merchantId}&bidId=${bidId}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (response.ok) {
        resolve(data); // Resolve with success message
      }
      if (!response.ok) {
        reject(data.error || "Failed to delete bid"); // Reject with error message
      }
    } catch (error) {
      reject(error.message); // Handle any errors
    }
  });
}

export function confirmBid(bidData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8081/merchant/confirmBid`,
        {
          method: "POST",
          body: JSON.stringify(bidData),
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok && data.message) {
        toast.success(data.message);
        resolve(data); // Resolve the Promise if request is successful
      }
      if (!response.ok && data.error) {
        toast.error(`Server Error : ${data.error}`);
        reject(data.error || "Failed to confirm bid"); // Reject with error message if any
      }
    } catch (error) {
      reject(error.message); // Reject the Promise in case of any error
    }
  });
}
