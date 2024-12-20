import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  categories: [],
  loadingCat: false,
};

export const getCategories = createAsyncThunk(
  "CategorySlice/getCategories",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`fetch_categories`, {
        headers: {
          token: token,
        },
      });
      // Only return the response.data, which is serializable
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const CategorySlice = createSlice({
  name: "category",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getCategories.pending, (state, action) => {
        // for loading
        state.loadingCat = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        // console.log(action.payload); // action.payload is now
        state.categories = action.payload;
        // console.log(state.categories);

        // console.log(action.payload.data);
        // const data = action.payload.transactions;
        // state.object = data;
        // console.log(state);
        state.loadingCat = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loadingCat = false;
        // state.name = action.payload;
      }),
});

export default CategorySlice.reducer;
