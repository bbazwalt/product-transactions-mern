import { configureStore } from "@reduxjs/toolkit";
import { transactionReducer } from "./transaction/reducer";

const store = configureStore({
  reducer: {
    transaction: transactionReducer,
  },
});

export { store };
