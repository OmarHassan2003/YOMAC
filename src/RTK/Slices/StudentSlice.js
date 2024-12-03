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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMTkxMzI0LCJpYXQiOjE3MzMxODk4MjQsImp0aSI6IjIwMGJmY2QxOWRmODQzMDJiMTJlNTQ1OGY0N2VhZDU2IiwiaWQiOjEsInJvbGUiOiJpbnN0cnVjdG9yIn0.2MI_YZVlu_6-DChncueVslQBktzUHOdfKq6ubD3VRpU",
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
