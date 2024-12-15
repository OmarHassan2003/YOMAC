import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  object: [],
  loadingTrans: false,
};

export const getTransactions = createAsyncThunk(
  "TransactionSlice/getTransactions",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_transactions`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      // Only return the response.data, which is serializable
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const TransactionSlice = createSlice({
  name: "transaction",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getTransactions.pending, (state, action) => {
        // for loading
        state.loadingTrans = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        console.log(action.payload.transactions); // action.payload is now  console.log(action.payload.data);
        const data = action.payload.transactions;
        state.object = data;
        console.log(state);
        state.loadingTrans = false;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loadingTran = false;
        // state.name = action.payload;
      }),
});

export default TransactionSlice.reducer;
