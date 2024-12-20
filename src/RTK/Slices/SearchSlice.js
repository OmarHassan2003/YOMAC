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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCoursesByCategory = createAsyncThunk(
  "SearchSlice/getCoursesByCategory",
  async (searchQuery, { getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(
        `search_by_categories?categories=${searchQuery}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const SearchSlice = createSlice({
  name: "Search",
  initialState: initialstate,
  reducers: {
    setCourses: (state) => {
      state.courses = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getCoursesByTitle.pending, (state) => {
        state.loadingSearch = true;
      })
      .addCase(getCoursesByTitle.fulfilled, (state, action) => {
        state.courses = action.payload;
        console.log(action.payload);
        state.loadingSearch = false;
      })
      .addCase(getCoursesByTitle.rejected, (state) => {
        state.loadingSearch = false;
      })
      .addCase(getCoursesByCategory.pending, (state) => {
        state.loadingSearch = true;
      })
      .addCase(getCoursesByCategory.fulfilled, (state, action) => {
        state.courses = action.payload[0];
        state.loadingSearch = false;
      })
      .addCase(getCoursesByCategory.rejected, (state) => {
        state.loadingSearch = false;
      }),
});

export default SearchSlice.reducer;

export const { setCourses } = SearchSlice.actions;
