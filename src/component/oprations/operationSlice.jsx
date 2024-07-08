import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  merchants: [],
  paginatedMerchants: [],
  bids: [],
  currSelected: {},
  currSelectedBid: {},
};

const merchantDataSlice = createSlice({
  name: "merchantData",
  initialState,
  reducers: {
    addNewMerchant(state, action) {
      state.merchants.push(action.payload);
    },
    addNewBid(state, action) {
      state.bids.push(action.payload);
    },
    removeMerchant(state, action) {
      const idx = state.merchants.findIndex((ele) => ele.id === action.payload);
      if (idx !== -1) {
        state.merchants.splice(idx, 1);
      }
    },
    removeBid(state, action) {
      const idx = state.bids.findIndex((ele) => ele.bidId === action.payload);
      if (idx !== -1) {
        state.bids.splice(idx, 1);
      }
    },
    updateMerchant(state, action) {
      const idx = state.merchants.findIndex(
        (ele) => ele.id === action.payload.id
      );
      if (idx !== -1) {
        state.merchants[idx] = action.payload;
      }
    },
    updateBidReducer(state, action) {
      const idx = state.bids.findIndex(
        (ele) => ele.bidId === action.payload.bidId
      );
      if (idx !== -1) {
        state.bids[idx] = action.payload;
      }
    },
    getMerchantById(state, action) {
      const merchant = state.merchants.find((ele) => ele.id === action.payload);
      state.currSelected = merchant ? { ...merchant } : {};
    },
    getMerchantByUserName(state, action) {
      const merchant = state.merchants.find(
        (ele) => ele.username === action.payload
      );
      state.currSelected = merchant ? { ...merchant } : {};
    },
    getBidsById(state, action) {
      const bidd = state.bids.find((ele) => ele.bidId === action.payload);
      state.currSelectedBid = bidd ? { ...bidd } : {};
    },
    confirmBid(state, action) {
      const { mid, bid } = action.payload;
      const merchant = state.merchants.find((ele) => ele.id === mid);
      if (merchant) {
        const existingBid = merchant.bids.find((b) => b.bidId === bid.bidId);
        if (!existingBid) {
          merchant.bids.push(bid);
        } else {
          console.log("Merchant has already bid on this bid");
        }
      }
    },
    updateBidStatus(state, action) {
      const { merchantId, bidId, status } = action.payload;
      const merchant = state.merchants.find(
        (merchant) => merchant.id === merchantId
      );
      if (merchant) {
        const bidIndex = merchant.bids.findIndex((bid) => bid.bidId === bidId);
        if (bidIndex !== -1) {
          merchant.bids[bidIndex] = {
            ...merchant.bids[bidIndex],
            status: status,
          };
        }
      }
    },
    deleteBid(state, action) {
      const { merchantId, bidId } = action.payload;
      const merchant = state.merchants.find(
        (merchant) => merchant.id === merchantId
      );
      // console.log(merchant, bidId);
      if (merchant) {
        const bidIndex = merchant.bids.findIndex((bid) => bid.bidId === bidId);
        if (bidIndex !== -1) {
          merchant.bids.splice(bidIndex, 1);
        }
      }
    },
    getMerchantByPage(state, action) {
      const { page, perPage } = action.payload;
      // console.log(page, perPage);
      const start = (page - 1) * perPage;
      const end = start + perPage;
      state.paginatedMerchants = state.merchants.slice(start, end);
    },
  },
});

export const {
  addNewBid,
  addNewMerchant,
  removeBid,
  removeMerchant,
  updateBidReducer,
  updateMerchant,
  getMerchantById,
  getMerchantByUserName,
  getBidsById,
  getMerchantByPage,
  deleteBid,
  confirmBid,
  updateBidStatus,
} = merchantDataSlice.actions;

export const selectMerchants = (state) => state.merchantData.merchants;
export const selectBids = (state) => state.merchantData.bids;
export const selectMerchant = (state) => state.merchantData.currSelected;
export const selectBidsById = (state) => state.merchantData.currSelectedBid;
export const selectPaginatedMerchants = (state) =>
  state.merchantData.paginatedMerchants;
export default merchantDataSlice.reducer;
