import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  whiteboard: [],
};

export const getWhiteboard = createAsyncThunk(
  "WhiteboardSlice/getWhiteboard",
  async (id, { getState, rejectWithValue }) => {
    // api call
    try {
      const response = await YomacApi.get(`get_course_whiteboard/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMTg1MzEwLCJpYXQiOjE3MzMxODM4MTAsImp0aSI6IjdiNGNmMTM5ZDUwODRmNWM5YTc5YTVhZDY5ZThlYjQzIiwiaWQiOjEsInJvbGUiOiJpbnN0cnVjdG9yIn0.6Xe3W4z3ZS3ZuGuKixaqiS_rtt0z35zGVqJv5VzG8_0",
        },
      });
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const WhiteboardSlice = createSlice({
  name: "Whiteboard",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getWhiteboard.pending, (state, action) => {
        // for loading
      })
      .addCase(getWhiteboard.fulfilled, (state, action) => {
        // state.name = action.payload;
        const data = action.payload.data;
        state.whiteboard = data.whiteboard;
      })
      .addCase(getWhiteboard.rejected, (state, action) => {
        // state.name = action.payload;
      }),
});

export default WhiteboardSlice.reducer;
