import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  questions: [],
};

export const getQuizQuestions = createAsyncThunk(
  "QuizSlice/getQuizQuestions",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_quiz_exam/${id}`, {
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

const QuizSlice = createSlice({
  name: "Quiz",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getQuizQuestions.pending, (state, action) => {
        // for loading
      })
      .addCase(getQuizQuestions.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log(action.payload.data);
        state.questions = action.payload.data.Questions;
        console.log(state.questions);
      })
      .addCase(getQuizQuestions.rejected, (state, action) => {
        // state.name = action.payload;
      }),
});

export default QuizSlice.reducer;
