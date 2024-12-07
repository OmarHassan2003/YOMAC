import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  message: "",
};

export const registerStudent = createAsyncThunk(
  "StudentRegistrationSlice/registerStudent",
  async (object, { getState, rejectWithValue }) => {
    // api call
    try {
      const response = await YomacApi.get(`get_single_course/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMjIyOTY0LCJpYXQiOjE3MzMyMjE0NjQsImp0aSI6IjllNDMwZDhkMDAxNDQ0NDFiMWM0OTVlOGQ0MjYxYTgxIiwiaWQiOjEsInJvbGUiOiJzdHVkZW50In0.0REJ8is3CMJcoh3_7b0HxZevzGy437t4cEEO7GnNNIo",
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

const StudentRegistrationSlice = createSlice({
  name: "Course",
  initialState: initialstate,
  reducers: {
    setCurrVid(state, action) {
      state.currVid = action.payload;
    },
    setCurrSection(state, action) {
      state.currSection = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerStudent.pending, (state, action) => {
        // for loading
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log(action.payload.data.course[0]);
        const data = action.payload.data.course[0];
        state.categoryid = data.categoryid;
        state.title = data.title;
        state.courseid = data.courseid;
        state.description = data.description;
        state.topinstructorid = data.topinstructorid;
        state.seenstatus = data.seenstatus;
        state.duration = data.duration;
        state.createdat = data.createdat;
        state.price = data.price;
        state.rating = data.rating;
        state.requirements = data.requirements;
        state.courseimage = data.courseimage;
        state.certificate = data.certificate;
        state.contests = data.contests;
        state.sections = data.sections;
        state.currVid = data.sections[0].videos[0];
        state.currSection = data.sections[0];
      })
      .addCase(registerStudent.rejected, (state, action) => {
        // state.name = action.payload;
      }),
});

export default StudentRegistrationSlice.reducer;
