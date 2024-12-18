import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  courses: [],
  loadingSearch: false,
};

export const getCoursesByTitle = createAsyncThunk(
  "SearchSlice/getCoursesByTitle",
  async (searchQuery, { getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    console.log(searchQuery, token);
    try {
      const response = await YomacApi.get(
        `search_by_title?title=${searchQuery}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      // Only return the response.data, which is serializable
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// search_by_categories ?categories=cat1&categories=cat2&categories=cat3

const SearchSlice = createSlice({
  name: "Search",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getCoursesByTitle.pending, (state, action) => {
        // for loading
        state.loadingSearch = true;
      })
      .addCase(getCoursesByTitle.fulfilled, (state, action) => {
        console.log(action.payload); // action.payload is now
        state.courses = action.payload;
        state.loadingSearch = false;
      })
      .addCase(getCoursesByTitle.rejected, (state, action) => {
        state.loadingSearch = false;
        // state.name = action.payload;
      }),
});

export default SearchSlice.reducer;
