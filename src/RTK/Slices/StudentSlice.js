import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  object: {},
};

export const getStudent = createAsyncThunk(
  "StudentSlice/getStudent",
  async (_, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_user_data`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
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