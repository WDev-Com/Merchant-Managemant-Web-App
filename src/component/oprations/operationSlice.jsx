import { createSlice, createAsyncThunk, combineSlices } from "@reduxjs/toolkit";
import {
  addMerchant,
  addNewBid,
  deleteMerchantById,
  removeBidById,
  updateMerchantById,
  updateBidById,
  getMerchantById,
  getMerchantsByPagination,
  getBidById,
  getAllBidsByPagination,
} from "./oprationAPI"; // Import your API methods

const initialState = {
  state: "",
  merchants: [],
  bids: [],
  totalMerchantCount: 0,
  totalBidCount: 0,
  currSelected: {},
  currSelectedBid: {},
  error: null,
};

// Create async thunks for each API call
// Create New Merchant ## DONE
export const createMerchantAsync = createAsyncThunk(
  "admin/createMerchant",
  async (merchantData, { rejectWithValue }) => {
    try {
      const response = await addMerchant(merchantData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Create New Bid ##### DONE
export const createNewBidAsync = createAsyncThunk(
  "admin/createNewBid",
  async (bidData, { rejectWithValue }) => {
    try {
      const response = await addNewBid(bidData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Delete Merchant ##### DONE
export const deleteMerchantAsync = createAsyncThunk(
  "admin/deleteMerchant",
  async (merchantId, { rejectWithValue }) => {
    try {
      await deleteMerchantById(merchantId);
      return merchantId; // Return ID for easier removal
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Delete Bid ##### DONE
export const deleteBidAsync = createAsyncThunk(
  "admin/deleteBid",
  async (bidId, { rejectWithValue }) => {
    // console.log(bidId);
    try {
      await removeBidById(bidId);
      return bidId; // Return ID for easier removal
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Update Merchant  ## Done
export const updateMerchantAsync = createAsyncThunk(
  "admin/updateMerchant",
  async ({ id, datas }, { rejectWithValue }) => {
    try {
      const response = await updateMerchantById(id, datas);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Update Bid # DONE
export const updateBidAsync = createAsyncThunk(
  "admin/updateBid",
  async ({ bidId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateBidById(bidId, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Fetch Merchant By ID  ## Done
export const fetchMerchantByIdAsync = createAsyncThunk(
  "admin/fetchMerchantById",
  async (merchantId, { rejectWithValue }) => {
    try {
      const response = await getMerchantById(merchantId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Fetch Merchants ##### DONE
export const fetchMerchantsByPaginationAsync = createAsyncThunk(
  "admin/fetchMerchantsByPagination",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await getMerchantsByPagination(page, limit);
      // console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// ## DONE
export const fetchBidByIdAsync = createAsyncThunk(
  "admin/fetchBidById",
  async (bidId, { rejectWithValue }) => {
    try {
      const response = await getBidById(bidId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// ##### DONE
export const fetchAllBidsByPaginationAsync = createAsyncThunk(
  "admin/fetchAllBidsByPagination",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await getAllBidsByPagination(page, limit);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // You can add additional synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    // Handle createMerchant ##### DONE
    builder
      .addCase(createMerchantAsync.pending, (state) => {
        state.state = "loading";
      })
      .addCase(createMerchantAsync.fulfilled, (state, action) => {
        state.state = "idle";
        state.merchants.push(action.payload);
      })
      .addCase(createMerchantAsync.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.payload;
      })

      // Handle createNewBid ##### DONE
      .addCase(createNewBidAsync.pending, (state) => {
        state.state = "loading";
      })
      .addCase(createNewBidAsync.fulfilled, (state, action) => {
        state.state = "idle";
        state.bids.push(action.payload);
      })
      .addCase(createNewBidAsync.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.payload;
      })

      // Handle deleteMerchant ##### DONE
      .addCase(deleteMerchantAsync.pending, (state) => {
        state.state = "loading";
      })
      .addCase(deleteMerchantAsync.fulfilled, (state, action) => {
        state.state = "idle";
        let MerchantID = action.payload;
        // console.log(initialState.merchants);
        let itemIND = state.merchants.findIndex((ele) => ele._id == MerchantID);
        state.merchants.splice(itemIND, 1);
      })
      .addCase(deleteMerchantAsync.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.payload;
      })

      // Handle deleteBid ##### DONE
      .addCase(deleteBidAsync.pending, (state) => {
        state.state = "loading";
      })
      .addCase(deleteBidAsync.fulfilled, (state, action) => {
        state.state = "idle";
        let bidID = action.payload;
        let itemIND = state.bids.findIndex((ele) => ele._id == bidID);
        state.bids.splice(itemIND, 1);
      })
      .addCase(deleteBidAsync.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.payload;
      })

      // Handle updateMerchant ### DONE
      .addCase(updateMerchantAsync.pending, (state) => {
        state.state = "loading";
      })
      .addCase(updateMerchantAsync.fulfilled, (state, action) => {
        state.state = "idle";
        const idx = state.merchants.findIndex(
          (merchant) => merchant.id === action.payload.id
        );
        if (idx !== -1) {
          state.merchants[idx] = action.payload;
        }
      })
      .addCase(updateMerchantAsync.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.payload;
      })

      // Handle updateBid ##DONE
      .addCase(updateBidAsync.pending, (state) => {
        state.state = "loading";
      })
      .addCase(updateBidAsync.fulfilled, (state, action) => {
        state.state = "idle";
        const idx = state.bids.findIndex(
          (bid) => bid.bidId === action.payload.bidId
        );
        if (idx !== -1) {
          state.bids[idx] = action.payload;
        }
      })
      .addCase(updateBidAsync.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.payload;
      })

      // Handle fetchMerchantById ### DONE
      .addCase(fetchMerchantByIdAsync.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchMerchantByIdAsync.fulfilled, (state, action) => {
        state.state = "idle";
        state.currSelected = action.payload;
      })
      .addCase(fetchMerchantByIdAsync.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.payload;
      })

      // Handle fetchMerchantsByPagination ##### DONE
      .addCase(fetchMerchantsByPaginationAsync.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchMerchantsByPaginationAsync.fulfilled, (state, action) => {
        state.state = "idle";
        state.merchants = action.payload.data;
        state.totalMerchantCount = action.payload.totalCount;
      })
      .addCase(fetchMerchantsByPaginationAsync.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.payload;
      })

      // Handle fetchBidById  ##### DONE
      .addCase(fetchBidByIdAsync.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchBidByIdAsync.fulfilled, (state, action) => {
        state.state = "idle";
        state.currSelectedBid = action.payload;
      })
      .addCase(fetchBidByIdAsync.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.payload;
      })

      // Handle fetchAllBidsByPagination ### DONE
      .addCase(fetchAllBidsByPaginationAsync.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchAllBidsByPaginationAsync.fulfilled, (state, action) => {
        state.state = "idle";
        state.bids = action.payload.data;
        state.totalBidCount = action.payload.totalCount;
      })
      .addCase(fetchAllBidsByPaginationAsync.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectMerchants = (state) => state.admin.merchants;
export const selectBids = (state) => state.admin.bids;
export const selectCurrentMerchant = (state) => state.admin.currSelected;
export const selectCurrentBid = (state) => state.admin.currSelectedBid;
export const selectPaginatedMerchants = (state) => state.admin.merchants;
export const selectMerchantTotalCount = (state) =>
  state.admin.totalMerchantCount;
export const selectBidsTotalCount = (state) => state.admin.totalBidCount;
export const selectError = (state) => state.admin.error;

export default adminSlice.reducer;
