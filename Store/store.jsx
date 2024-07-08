import { configureStore, createReducer } from "@reduxjs/toolkit";
import merchantDataReducer from "../src/component/oprations/operationSlice";
import authReducer from "../src/component/auth/Authslice";
const store = configureStore({
  reducer: {
    merchantData: merchantDataReducer,
    auth: authReducer,
  },
});

export default store;
