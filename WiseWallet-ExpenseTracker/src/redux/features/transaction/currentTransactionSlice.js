import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transaction: null,
  isUpdateModalOpen: false,
};

const currentTransaction = createSlice({
  name: "currentTransaction",
  initialState,
  reducers: {
    setCurrentTransaction: (state, action) => {
      console.log("received transaction: ", action.payload);
      state.transaction = action.payload;
    },
    closeIsUpdateModalOpen: (state) => {
      state.isUpdateModalOpen = false;
    },
    setIsUpdateModalOpen: (state) => {
      state.isUpdateModalOpen = true;
    },
  },
});

export default currentTransaction.reducer;
export const { setCurrentTransaction } = currentTransaction.actions;
