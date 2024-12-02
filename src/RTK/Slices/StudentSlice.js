import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  studentid: 0,
  studentname: "",
  email: "",
  learning_time: "",
  balance: 0,
  username: "",
  profilepic: "",
  createdat: "",
  courses_progress: [],
};

export const getStudent = createAsyncThunk(
  "StudentSlice/getStudent",
  async (id, { getState, rejectWithValue }) => {
    // api call
    try {
      const response = await YomacApi.get(`get_student_data/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMDk4ODc5LCJpYXQiOjE3MzMwOTczNzksImp0aSI6IjVmOTZiYWM2ZjA0ZDRmMzFhNzNmOTYwNDlmMTk3NWZmIiwiaWQiOjEsInJvbGUiOiJzdHVkZW50In0.rNAYZLDUt98VdvoTZ2EbqrTy3x3h2sp-KU5Da9ZPBiI",
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
        const data = action.payload.data.student_data;
        state.studentid = data.studentid;
        state.studentname = data.studentname;
        state.email = data.email;
        state.username = data.username;
        state.profilepic = data.profilepic;
        state.createdat = data.createdat;
        state.balance = data.balance;
        state.learning_time = data.learning_time;
        state.courses_progress = data.courses_progress;
        console.log(state);
      })
      .addCase(getStudent.rejected, (state, action) => {
        // state.name = action.payload;
      }),
});

export default StudentSlice.reducer;
