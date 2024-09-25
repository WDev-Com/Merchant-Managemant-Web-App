import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  confirmBid,
  getBidsByMerchantId,
  deleteMerchantBid,
  getMerchantByUsername,
} from "./merchantAPI";
import { updateBidStatus } from "../oprations/oprationAPI";

const initialState = {
  bids: [],
  currSelected: null,
  status: "idle",
  error: null,
};

// Async Thunks

export const getMerchantByUsernameAsync = createAsyncThunk(
  "merchant/getMerchantByUsername",
  async (username) => {
    try {
      const response = await getMerchantByUsername(username);
      return response; // Returning the response directly
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const getBidsByMerchantIdAsync = createAsyncThunk(
  "merchant/getBidsByMerchantId",
  async (merchantId) => {
    try {
      const response = await getBidsByMerchantId(merchantId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const confirmBidAsync = createAsyncThunk(
  "merchant/confirmBid",
  async ({ bidData }, { rejectWithValue }) => {
    try {
      const response = await confirmBid(bidData);
      return response; // Return the confirmed bid data
    } catch (error) {
      return rejectWithValue(error.message); // Handle error
    }
  }
);

export const deleteMerchantBidAsync = createAsyncThunk(
  "merchant/deleteMerchantBid",
  async ({ merchantId, bidId }, { rejectWithValue }) => {
    try {
      const response = await deleteMerchantBid(merchantId, bidId);
      return response; // Return the success message
    } catch (error) {
      return rejectWithValue(error.message); // Handle error
    }
  }
);

export const changeBidStatusAsync = createAsyncThunk(
  "admin/changeBidStatus",
  async ({ merchantId, bidId, status }, { rejectWithValue }) => {
    try {
      await updateBidStatus(merchantId, bidId, status);
      return { merchantId, bidId, status }; // Return payload for the reducer
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const merchantSlice = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    clearCurrentMerchantBids(state, action) {
      state.bids = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // getMerchantByUsername logic
      // Handle pending state
      .addCase(getMerchantByUsernameAsync.pending, (state) => {
        state.status = "loading";
        // console.log("Fetching merchant data...");
      })
      // Handle successful API call
      .addCase(getMerchantByUsernameAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log("Fulfilled Payload: ", action.payload); // Log fulfilled action payload
        state.currSelected = action.payload; // Store the merchant object in currSelected
      })
      // Handle failure
      .addCase(getMerchantByUsernameAsync.rejected, (state, action) => {
        state.status = "failed";
        // console.log("Error: ", action.error.message); // Log error message
        state.error = action.error.message;
      })
      // getBidsByMerchantIdAsync logic
      // Handle pending state
      .addCase(getBidsByMerchantIdAsync.pending, (state) => {
        state.status = "loading";
        // console.log("Fetching bids...");
      })
      // Handle successful API call
      .addCase(getBidsByMerchantIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log("Bids loaded: ", action.payload); // Log fulfilled action payload
        state.bids = action.payload; // Store the fetched bids in state
      })
      // Handle failure
      .addCase(getBidsByMerchantIdAsync.rejected, (state, action) => {
        state.status = "failed";
        // console.log("Error fetching bids: ", action.error.message); // Log error message
        state.error = action.error.message;
      })
      // Confirm Bid Logic ## DONE
      .addCase(confirmBidAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(confirmBidAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log("Bid confirmed: ", action.payload);
        // Handle confirmed bid data if necessary
      })
      .addCase(confirmBidAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete Bid Logic # Done
      .addCase(deleteMerchantBidAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMerchantBidAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log("Bid deleted: ", action.payload);
        // Handle deletion logic if necessary
      })
      .addCase(deleteMerchantBidAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Use the error message from rejectWithValue
        // console.log("Error deleting bid: ", action.payload);
      }) // Handle changeBidStatus
      .addCase(changeBidStatusAsync.pending, (state) => {
        state.state = "loading";
      })
      .addCase(changeBidStatusAsync.fulfilled, (state, action) => {
        state.state = false;
        const { merchantId, bidId, status } = action.payload;
        // console.log(merchantId, bidId, status);
        let ITEMind = state.bids.findIndex(
          (ele) => ele.bidId == bidId && ele.merchantId == merchantId
        );
        state.bids[ITEMind]["status"] = status;
      })
      .addCase(changeBidStatusAsync.rejected, (state, action) => {
        state.state = false;
        state.error = action.payload;
      });
  },
});
export const { clearCurrentMerchantBids } = merchantSlice.actions;
export const selectCurrMerchant = (state) => state.merchant.currSelected;
export const selectMerchantBids = (state) => state.merchant.bids;

export default merchantSlice.reducer;
