import { configureStore, createReducer } from "@reduxjs/toolkit";
import merchantReducer from "../src/component/merchant/merchantSilce";
import authReducer from "../src/component/auth/Authslice";
import adminReducer from "../src/component/oprations/operationSlice";
const store = configureStore({
  reducer: {
    merchant: merchantReducer,
    auth: authReducer,
    admin: adminReducer,
  },
});

export default store;
