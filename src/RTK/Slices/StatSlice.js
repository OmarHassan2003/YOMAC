import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  object: [],
  loadingStat: false,
};

export const getStats = createAsyncThunk(
  "StatSlice/getStats",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_stats`, {
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

const StatSlice = createSlice({
  name: "stat",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getStats.pending, (state, action) => {
        // for loading
        state.loadingStat = true;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        console.log(action.payload.transactions); // action.payload is now  console.log(action.payload.data);
        const data = action.payload;
        state.object = data;
        console.log(state);
        state.loadingStat = false;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.loadingStat = false;
        // state.name = action.payload;
      }),
});

export default StatSlice.reducer;
