import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import currentTransactionReducer from "../features/transaction/currentTransactionSlice";
// import { createLogger } from "redux-logger";

// const logger = createLogger();

const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
    currentTransaction: currentTransactionReducer,
  },
  // middleware: (middleware) => middleware().concat(logger),
});

export default store;
