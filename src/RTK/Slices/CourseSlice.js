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
  fetchedAssignments: [],
  assignID: null,
  loadingVid: false,
  fetchedSingleAssign: null,
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

export const getAssign = createAsyncThunk(
  "CourseSlice/getAssign",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_course_assignments/${id}`, {
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

export const getSingleAssign = createAsyncThunk(
  "CourseSlice/getSingleAssign",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_assignment/${id}`, {
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

export const addSection = createAsyncThunk(
  "CourseSlice/addSection",
  async (data, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.post("add_section", data, {
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

export const addSectionThenGet = createAsyncThunk(
  "CourseSlice/addSectionThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(addSection(data));
    return dispatch(getCourse(data.courseId));
  }
);

export const addVideo = createAsyncThunk(
  "CourseSlice/addVideo",
  async (data, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.post("add_video", data, {
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

export const addVideoThenGet = createAsyncThunk(
  "CourseSlice/addVideoThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(addVideo(data));
    return dispatch(getCourse(data.videos[0].courseId));
  }
);

export const addQuiz = createAsyncThunk(
  "CourseSlice/addQuiz",
  async (data, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.post("instructor_add_quiz", data, {
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

export const addQuizThenGet = createAsyncThunk(
  "CourseSlice/addQuizThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(addQuiz(data));
    return dispatch(getCourse(data.courseId));
  }
);

export const addAssignment = createAsyncThunk(
  "CourseSlice/addAssignment",
  async (data, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.post("add_assignment", data, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
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

export const updateAssignment = createAsyncThunk(
  "CourseSlice/updateAssignment",
  async (data, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.put("update_assignment", data, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
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

export const deleteSection = createAsyncThunk(
  "CourseSlice/deleteSection",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.delete(`delete_section/${id}`, {
        headers: {
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

export const deleteSectionThenGet = createAsyncThunk(
  "CourseSlice/deleteSectionThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(deleteSection(data.sectionId));
    return dispatch(getCourse(data.courseId));
  }
);

export const deleteVideo = createAsyncThunk(
  "CourseSlice/deleteVideo",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.delete(`delete_video/${id}`, {
        headers: {
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

export const deleteVideoThenGet = createAsyncThunk(
  "CourseSlice/deleteVideoThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(deleteVideo(data.videoId));
    return dispatch(getCourse(data.courseId));
  }
);

export const deleteQuiz = createAsyncThunk(
  "CourseSlice/deleteQuiz",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.delete(`delete_quiz/${id}`, {
        headers: {
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

export const deleteQuizThenGet = createAsyncThunk(
  "CourseSlice/deleteQuizThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(deleteQuiz(data.quizId));
    return dispatch(getCourse(data.courseId));
  }
);

export const deleteAssign = createAsyncThunk(
  "CourseSlice/deleteAssign",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.delete(`delete_assignment/${id}`, {
        headers: {
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

export const deleteAssignThenGet = createAsyncThunk(
  "CourseSlice/deleteAssignThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(deleteAssign(data.assignmentId));
    return dispatch(getCourse(data.courseId));
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
        state.currVid = null;
        state.loadingVid = false;
        // state.currSection = data.sections[0];
      })
      .addCase(getCourse.rejected, (state, action) => {
        // state.name = action.payload;
        state.loadingVid = false;
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
        state.loadingVid = false;
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
      })
      .addCase(addSection.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(addSection.fulfilled, (state, action) => {
        // state.name = action.payload;
        // console.log(action.payload.data);
        console.log("al denia 7lwa");
        state.loadingVid = false;
      })
      .addCase(addSection.rejected, (state, action) => {
        state.loadingVid = false;
        // state.name = action.payload;
      })
      .addCase(addSectionThenGet.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(addSectionThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        // console.log(action.payload.data);
        console.log("al denia 7lwa");
        state.loadingVid = false;
      })
      .addCase(addSectionThenGet.rejected, (state, action) => {
        state.loadingVid = false;
        // state.name = action.payload;
      })
      .addCase(addVideo.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(addVideo.fulfilled, (state, action) => {
        // state.name = action.payload;
        // console.log(action.payload.data);
        console.log("al denia 7lwa");
        state.loadingVid = false;
      })
      .addCase(addVideo.rejected, (state, action) => {
        state.loadingVid = false;
        // state.name = action.payload;
      })
      .addCase(addVideoThenGet.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(addVideoThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        // console.log(action.payload.data);
        console.log("al denia 7lwa");
        state.loadingVid = false;
      })
      .addCase(addVideoThenGet.rejected, (state, action) => {
        state.loadingVid = false;
        // state.name = action.payload;
      })
      .addCase(addQuiz.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(addQuiz.fulfilled, (state, action) => {
        // state.name = action.payload;
        // console.log(action.payload.data);
        console.log("al denia 7lwa");
        state.loadingVid = false;
      })
      .addCase(addQuiz.rejected, (state, action) => {
        state.loadingVid = false;
        // state.name = action.payload;
      })
      .addCase(addQuizThenGet.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(addQuizThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        // console.log(action.payload.data);
        console.log("al denia 7lwa");
        state.loadingVid = false;
      })
      .addCase(addQuizThenGet.rejected, (state, action) => {
        state.loadingVid = false;
        // state.name = action.payload;
      })
      .addCase(getAssign.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(getAssign.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log(action.payload.data);
        state.fetchedAssignments = action.payload.data;
        state.loadingVid = false;
      })
      .addCase(getAssign.rejected, (state, action) => {
        // state.name = action.payload;
        state.loadingVid = false;
      })
      .addCase(getSingleAssign.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(getSingleAssign.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log(action.payload.data);
        state.fetchedSingleAssign = action.payload.data;
        state.loadingVid = false;
      })
      .addCase(getSingleAssign.rejected, (state, action) => {
        // state.name = action.payload;
        state.loadingVid = false;
      })
      .addCase(addAssignment.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(addAssignment.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("Assignment Created");
        state.loadingVid = false;
      })
      .addCase(addAssignment.rejected, (state, action) => {
        // state.name = action.payload;
        // console.log("Assignment Failed to be Created");
        state.loadingVid = false;
      })
      .addCase(deleteSection.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("section deleted");
        state.loadingVid = false;
      })
      .addCase(deleteSection.rejected, (state, action) => {
        // state.name = action.payload;
        // console.log("Assignment Failed to be Created");
        state.loadingVid = false;
      })
      .addCase(deleteSectionThenGet.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(deleteSectionThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("section deleted");
        state.loadingVid = false;
      })
      .addCase(deleteSectionThenGet.rejected, (state, action) => {
        // state.name = action.payload;
        // console.log("Assignment Failed to be Created");
        state.loadingVid = false;
      })
      .addCase(deleteVideo.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("vid deleted");
        state.loadingVid = false;
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        // state.name = action.payload;
        // console.log("Assignment Failed to be Created");
        state.loadingVid = false;
      })
      .addCase(deleteVideoThenGet.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(deleteVideoThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("vid deleted");
        state.loadingVid = false;
      })
      .addCase(deleteVideoThenGet.rejected, (state, action) => {
        // state.name = action.payload;
        // console.log("Assignment Failed to be Created");
        state.loadingVid = false;
      })
      .addCase(deleteQuiz.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("quiz deleted");
        state.loadingVid = false;
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        // state.name = action.payload;
        // console.log("Assignment Failed to be Created");
        state.loadingVid = false;
      })
      .addCase(deleteQuizThenGet.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(deleteQuizThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("quiz deleted");
        state.loadingVid = false;
      })
      .addCase(deleteQuizThenGet.rejected, (state, action) => {
        // state.name = action.payload;
        // console.log("Assignment Failed to be Created");
        state.loadingVid = false;
      })
      .addCase(deleteAssign.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(deleteAssign.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("assign deleted");
        state.loadingVid = false;
      })
      .addCase(deleteAssign.rejected, (state, action) => {
        // state.name = action.payload;
        // console.log("Assignment Failed to be Created");
        state.loadingVid = false;
      })
      .addCase(deleteAssignThenGet.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(deleteAssignThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("assign deleted");
        state.loadingVid = false;
      })
      .addCase(deleteAssignThenGet.rejected, (state, action) => {
        // state.name = action.payload;
        // console.log("Assignment Failed to be Created");
        state.loadingVid = false;
      })
      .addCase(updateAssignment.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("assign update");
        state.loadingVid = false;
      })
      .addCase(updateAssignment.rejected, (state, action) => {
        // state.name = action.payload;
        // console.log("Assignment Failed to be Created");
        state.loadingVid = false;
      }),
});

export const { setCurrVid, setCurrSection } = CourseSlice.actions;
export default CourseSlice.reducer;
