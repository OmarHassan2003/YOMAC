import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  object: [],
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
      console.log(response.data);
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
      const response = await YomacApi.post(`add_feedback`, data, {
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
        console.log("Feedback added successfully");
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
        console.log("Feedback added successfully");
        state.loadingFed = false;
      })
      .addCase(addCourseFeedback.rejected, (state, action) => {
        state.loadingFed = false;
        // state.name = action.payload;
      }),
});

export default FeedbackSlice.reducer;
