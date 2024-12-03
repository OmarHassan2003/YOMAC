import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  object: {},
};

export const getStudent = createAsyncThunk(
  "StudentSlice/getStudent",
  async (_, { getState, rejectWithValue }) => {
    // api call
    try {
      const response = await YomacApi.get(`get_user_data`, {
        headers: {
          "Content-Type": "application/json",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMjIxOTcxLCJpYXQiOjE3MzMyMjA0NzEsImp0aSI6ImY5ZDUxNGM1NDYwNTRiNDhiODU3ZGIwMGIwNWE3M2E5IiwiaWQiOjEsInJvbGUiOiJpbnN0cnVjdG9yIn0.6lM9nIJ0RAiW4mvVDFKT3kYWHkM1Z9h_wkBL16tZZtQ",
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

const StudentSlice = createSlice({
  name: "Student",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getStudent.pending, (state, action) => {
        // for loading
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log(action.payload.data);
        const data = action.payload.data;
        state.object = data;
        console.log(state);
      })
      .addCase(getStudent.rejected, (state, action) => {
        // state.name = action.payload;
      }),
});

export default StudentSlice.reducer;
