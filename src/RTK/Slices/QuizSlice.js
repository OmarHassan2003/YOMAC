import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  quiz: {},
  questions: [],
  loadingQuiz: false,
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

export const updateQuiz = createAsyncThunk(
  "QuizSlice/updateQuiz",
  async (data, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.put(`update_quiz`, data, {
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

export const updateQuizThenGet = createAsyncThunk(
  "CourseSlice/updateQuizThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(updateQuiz(data));
    return dispatch(getQuizQuestions(data.quiz.quizID));
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
        state.loadingQuiz = true;
      })
      .addCase(getQuizQuestions.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log(action.payload.data);
        state.quiz = action.payload.data.Quiz;
        state.questions = action.payload.data.Questions;
        // console.log(state);
        state.loadingQuiz = false;
      })
      .addCase(getQuizQuestions.rejected, (state, action) => {
        // state.name = action.payload;
        state.loadingQuiz = false;
      })
      .addCase(updateQuiz.pending, (state, action) => {
        // for loading
        state.loadingQuiz = true;
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("Quiz Updated successfully");
        // state.loadingQuiz = false;
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        // state.name = action.payload;
        console.log("Quiz Update failed");
        // state.loadingQuiz = false;
      })
      .addCase(updateQuizThenGet.pending, (state, action) => {
        // for loading
        state.loadingQuiz = true;
      })
      .addCase(updateQuizThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("Quiz Updated successfully");
        state.loadingQuiz = false;
      })
      .addCase(updateQuizThenGet.rejected, (state, action) => {
        // state.name = action.payload;
        console.log("Quiz Update failed");
        state.loadingQuiz = false;
      }),
});

export default QuizSlice.reducer;
