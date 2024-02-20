import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserByEmail } from "../../../service/userservice";
const initialState = {
  loading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      (state.loading = false), (state.user = action.payload);
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });
  },
});

// createAsyncThunk handles the error and provides three status
//pending, fulfilled,rejected we have to write extraReducer to handle those actions

export const fetchUser = createAsyncThunk("fetch/user", () => {
  return getUserByEmail().then((response) => response.data);
});

export default userSlice.reducer;
