import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  getUserTransactions,
} from "../../../service/transactionservice";

const initialState = {
  loading: false,
  transactions: null,
  error: null,
};

// createAsyncThunk handles the error and provides three status
//pending, fulfilled,rejected we have to write extraReducer to handle those actions
export const fetchTransactions = createAsyncThunk("fetch/transactions", () => {
  return getUserTransactions().then((response) => response.data);
});

export const addTransation = createAsyncThunk("transactions/add", (object) => {
  return addTransaction(object).then((response) => response.data);
});

export const deleteTransation = createAsyncThunk(
  "transactions/delete",
  (id) => {
    return deleteTransaction(id).then((response) => response.data);
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default transactionSlice.reducer;
