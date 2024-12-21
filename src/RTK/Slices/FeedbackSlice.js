import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  courses: [],
  instructor: [],
  loadingFed: false,
};

export const addInstructorFeedback = createAsyncThunk(
  "FeedbackSlice/addInstructorFeedback",
  async (data, { getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.post(`add_feedback_to_instructor`, data, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });
      // Only return the response.data, which is serializable
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const addCourseFeedback = createAsyncThunk(
  "FeedbackSlice/addCourseFeedback",
  async (data, { getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.post(`add_feedback_to_course`, data, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });
      // Only return the response.data, which is serializable
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getCourseFeedback = createAsyncThunk(
  "FeedbackSlice/getCourseFeedback",
  async (id, { getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_feedbacks_for_course/${id}`, {
        headers: {
          token: token,
        },
      });
      // Only return the response.data, which is serializable
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getInstructorFeedback = createAsyncThunk(
  "FeedbackSlice/getInstructorFeedback",
  async (id, { getState, rejectWithValue }) => {
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(
        `get_feedbacks_for_instructor/${id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      // Only return the response.data, which is serializable
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const addCourseFeedbackThenGet = createAsyncThunk(
  "StudentSlice/addCourseFeedbackThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(addCourseFeedback(data));
    return dispatch(getCourseFeedback(data.course_id));
  }
);
export const addInstructorFeedbackThenGet = createAsyncThunk(
  "StudentSlice/addInstructorFeedbackThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(addInstructorFeedback(data));
    return dispatch(getInstructorFeedback(data.instructor_id));
  }
);

const FeedbackSlice = createSlice({
  name: "feedback",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addInstructorFeedback.pending, (state, action) => {
        // for loading
        state.loadingFed = true;
      })
      .addCase(addInstructorFeedback.fulfilled, (state, action) => {
        console.log("Instructor Feedback added successfully");
        state.loadingFed = false;
      })
      .addCase(addInstructorFeedback.rejected, (state, action) => {
        state.loadingFed = false;
        // state.name = action.payload;
      })
      .addCase(addCourseFeedback.pending, (state, action) => {
        // for loading
        state.loadingFed = true;
      })
      .addCase(addCourseFeedback.fulfilled, (state, action) => {
        console.log("Course Feedback added successfully");
        state.loadingFed = false;
      })
      .addCase(addCourseFeedback.rejected, (state, action) => {
        state.loadingFed = false;
        // state.name = action.payload;
      })
      .addCase(getCourseFeedback.pending, (state, action) => {
        // for loading
        state.loadingFed = true;
      })
      .addCase(getCourseFeedback.fulfilled, (state, action) => {
        // console.log(action.payload.reviews);
        state.courses = action.payload.reviews;
        state.loadingFed = false;
      })
      .addCase(getCourseFeedback.rejected, (state, action) => {
        state.loadingFed = false;
        // state.name = action.payload;
      })
      .addCase(getInstructorFeedback.pending, (state, action) => {
        // for loading
        state.loadingFed = true;
      })
      .addCase(getInstructorFeedback.fulfilled, (state, action) => {
        console.log(action.payload.reviews);
        state.instructor = action.payload.reviews;
        state.loadingFed = false;
      })
      .addCase(getInstructorFeedback.rejected, (state, action) => {
        state.loadingFed = false;
        // state.name = action.payload;
      })
      .addCase(addCourseFeedbackThenGet.pending, (state, action) => {
        // for loading
        state.loadingStu = true;
      })
      .addCase(addCourseFeedbackThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("al donia 7lwa");
        state.loadingStu = false;
      })
      .addCase(addCourseFeedbackThenGet.rejected, (state, action) => {
        // state.name = action.payload;
        state.loadingStu = false;
      })
      .addCase(addInstructorFeedbackThenGet.pending, (state, action) => {
        // for loading
        state.loadingStu = true;
      })
      .addCase(addInstructorFeedbackThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("al donia 7lwa");
        state.loadingStu = false;
      })
      .addCase(addInstructorFeedbackThenGet.rejected, (state, action) => {
        // state.name = action.payload;
        state.loadingStu = false;
      }),
});

export default FeedbackSlice.reducer;
