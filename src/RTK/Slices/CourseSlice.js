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
  fetchedVideo: {},
  loadingVid: false,
};

export const getCourse = createAsyncThunk(
  "CourseSlice/getCourse",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_single_course/${id}`, {
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

export const getVideo = createAsyncThunk(
  "CourseSlice/getVideo",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_video/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const CreateCourseAPI = createAsyncThunk(
  "AuthorizationSlice/CreateCourseAPI",
  async (data, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const obj = {
        headers: {
          "Content-Type": "application/json",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQxMzg2NzA5LCJpYXQiOjE3MzM2MTA3MDksImp0aSI6Ijc4N2ZlZGRkMTVlMDQxOTZiZThjN2ZlNTk1N2I5Mzg1IiwiaWQiOjEsInJvbGUiOiJpbnN0cnVjdG9yIn0.oPoCWcua0aJx6nBxLrMUDZR1yUtDFXkImpjjtzBE4VY",
        },
      };
      const response = await YomacApi.post("create_course", data, {
        headers: {
          token: token,
          "Content-Type": "application/json",

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

export const getVideo = createAsyncThunk(
  "CourseSlice/getVideo",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_video/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      console.log(response);
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
        state.loadingVid = true;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        // state.name = action.payload;
        // console.log(action.payload.data);
        const data = action.payload.data;
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
        state.loadingVid = false;
        // state.currSection = data.sections[0];
      })
      .addCase(getCourse.rejected, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(getVideo.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(getVideo.fulfilled, (state, action) => {
        // state.name = action.payload;
        // console.log(action.payload.data);
        state.fetchedVideo = action.payload.data;
        state.currVid = action.payload.data;
        state.loadingVid = false;
      })
      .addCase(getVideo.rejected, (state, action) => {
        // state.name = action.payload;

      })
      .addCase(CreateCourseAPI.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(CreateCourseAPI.fulfilled, (state, action) => {
        // state.name = action.payload;
        // console.log(action.payload.data);
        console.log("al denia 7lwa");
        state.loadingVid = false;
      })
      .addCase(CreateCourseAPI.rejected, (state, action) => {
        state.loadingVid = false;
        // state.name = action.payload;

      }),
});

export const { setCurrVid, setCurrSection } = CourseSlice.actions;
export default CourseSlice.reducer;
