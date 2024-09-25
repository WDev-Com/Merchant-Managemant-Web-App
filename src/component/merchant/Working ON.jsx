export const confirmBidAsync = createAsyncThunk(
  "merchant/confirmBid",
  async (bidData) => {
    const response = await confirmBid(bidData);
    return response;
  }
);

export const getBidsByMerchantIdAsync = createAsyncThunk(
  "merchant/getBidsByMerchantId",
  async (merchantId) => {
    const response = await getBidsByMerchantId(merchantId);
    return response;
  }
);

export const getMerchantProfileByIdAsync = createAsyncThunk(
  "merchant/getMerchantProfileById",
  async (merchantId) => {
    const response = await getMerchantProfileById(merchantId);
    return response;
  }
);

export const deleteMerchantBidAsync = createAsyncThunk(
  "merchant/deleteMerchantBid",
  async ({ merchantId, bidId }) => {
    const response = await deleteMerchantBid(merchantId, bidId);
    return response;
  }
);

// confirmBid logic
Function.addCase(confirmBidAsync.fulfilled, (state, action) => {
  const { merchantId, bid } = action.payload;
  const merchant = state.merchants.find((ele) => ele.merchantId === merchantId);
  if (merchant) {
    const existingBid = merchant.bids.find((b) => b.bidId === bid.bidId);
    if (!existingBid) {
      merchant.bids.push(bid);
    } else {
      console.log("Merchant has already bid on this bid");
    }
  }
})

  // getBidsByMerchantId logic
  .addCase(getBidsByMerchantIdAsync.fulfilled, (state, action) => {
    const merchantId = action.meta.arg;
    const merchant = state.merchants.find(
      (ele) => ele.merchantId === merchantId
    );
    if (merchant) {
      merchant.bids = action.payload;
    }
  })

  // getMerchantProfileById logic
  .addCase(getMerchantProfileByIdAsync.fulfilled, (state, action) => {
    const merchantProfile = action.payload;
    const existingMerchant = state.merchants.find(
      (ele) => ele.merchantId === merchantProfile.merchantId
    );
    if (!existingMerchant) {
      state.merchants.push(merchantProfile);
    }
  })

  // deleteMerchantBid logic
  .addCase(deleteMerchantBidAsync.fulfilled, (state, action) => {
    const { merchantId, bidId } = action.meta.arg;
    const merchant = state.merchants.find(
      (ele) => ele.merchantId === merchantId
    );
    if (merchant) {
      merchant.bids = merchant.bids.filter((b) => b.bidId !== bidId);
    }
  });
