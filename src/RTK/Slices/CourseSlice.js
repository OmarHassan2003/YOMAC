import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  courseid: 0,
  title: "",
  description: "",
  topinstructorid: 0,
  categoryid: 0,
  seenstatus: "",
  duration: "",
  createdat: "",
  price: 0,
  rating: 0,
  requirements: [],
  courseimage: "",
  certificate: "",
  contests: [],
  sections: [],
  currVid: null,
  currSection: null,
};

export const getCourse = createAsyncThunk(
  "CourseSlice/getCourse",
  async (id, { getState, rejectWithValue }) => {
    // api call
    try {
      const response = await YomacApi.get(`get_single_course/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMjU1NDMyLCJpYXQiOjE3MzMyNTM5MzIsImp0aSI6IjM4OWIyYWFlN2FkYTQ2OWM4NzdmMTJmN2QwN2JmYjQxIiwiaWQiOjEsInJvbGUiOiJzdHVkZW50In0.aCpJetoOf5eS8iNzloGuK8dBFktKTShCF-34GE37tNE",
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

export const createCourse = createAsyncThunk(
  "CourseSlice/createCourse",
  async (course, { getState, rejectWithValue }) => {
    // api call
    try {
      const response = await YomacApi.get(`create_course`, {
        headers: {
          "Content-Type": "application/json",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMjU1NDMyLCJpYXQiOjE3MzMyNTM5MzIsImp0aSI6IjM4OWIyYWFlN2FkYTQ2OWM4NzdmMTJmN2QwN2JmYjQxIiwiaWQiOjEsInJvbGUiOiJzdHVkZW50In0.aCpJetoOf5eS8iNzloGuK8dBFktKTShCF-34GE37tNE",
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

const CourseSlice = createSlice({
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
      .addCase(getCourse.pending, (state, action) => {
        // for loading
      })
      .addCase(getCourse.fulfilled, (state, action) => {
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
      .addCase(getCourse.rejected, (state, action) => {
        // state.name = action.payload;
      })

      .addCase(createCourse.pending, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(createCourse.rejected, (state, action) => {
        // state.name = action.payload;
      }),
});

export const { setCurrVid, setCurrSection } = CourseSlice.actions;
export default CourseSlice.reducer;
