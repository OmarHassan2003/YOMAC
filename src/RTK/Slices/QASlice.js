import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  qa_questions: [],
  fetchedQA: null,
  loadingQA: false,
};

export const getVidQA = createAsyncThunk(
  "QASlice/getVidQA",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_video_qa/${id}`, {
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

export const getQAAnswers = createAsyncThunk(
  "QASlice/getQAAnswers",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_qa_messages/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      //   console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const postQuestion = createAsyncThunk(
  "QASlice/postQuestion",
  async (data, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.post(`ask_in_qa`, data, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      //   console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const postStudentAnswer = createAsyncThunk(
  "QASlice/postStudentAnswer",
  async (data, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.post(`student_answers_in_qa`, data, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      //   console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const postInstructorAnswer = createAsyncThunk(
  "QASlice/postInstructorAnswer",
  async (data, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.post(`instructor_answers_in_qa`, data, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      //   console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const postThenGet = createAsyncThunk(
  "QASlice/postThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(postQuestion(data));
    return dispatch(getVidQA(data.videoID));
  }
);

export const postStudentAnswerThenGet = createAsyncThunk(
  "QASlice/postStudentAnswerThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(postStudentAnswer(data));
    return dispatch(getQAAnswers(data.QAID));
  }
);

export const postInstructorAnswerThenGet = createAsyncThunk(
  "QASlice/postInstructorAnswerThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(postInstructorAnswer(data));
    return dispatch(getQAAnswers(data.QAID));
  }
);
export const deleteQA = createAsyncThunk(
  "QASlice/deleteQA",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.delete(`delete_qa/${id}`, {
        headers: {
          token: token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      //   console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const deleteQAThenGet = createAsyncThunk(
  "QASlice/deleteQAThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(deleteQA(data.qaID));
    return dispatch(getVidQA(data.videoID));
  }
);

export const deleteMessage = createAsyncThunk(
  "QASlice/deleteMessage",
  async (data, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.delete(`delete_message`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        data,
      });
      //   console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const deleteMessageThenGet = createAsyncThunk(
  "QASlice/deleteMessageThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(deleteMessage(data));
    return dispatch(getQAAnswers(data.qaID));
  }
);

const QASlice = createSlice({
  name: "QA",
  initialState: initialstate,
  reducers: {
    setfetchedQA(state, action) {
      state.fetchedQA = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getVidQA.pending, (state, action) => {
        // for loading
        state.loadingQA = true;
      })
      .addCase(getVidQA.fulfilled, (state, action) => {
        // state.name = action.payload;
        // console.log(action.payload.data);
        state.qa_questions = action.payload.data.qa_questions;
        state.loadingQA = false;
        // console.log(state.qa_questions);
      })
      .addCase(getVidQA.rejected, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(getQAAnswers.pending, (state, action) => {
        // for loading
        state.loadingQA = true;
      })
      .addCase(getQAAnswers.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log(action.payload.data);
        state.fetchedQA = action.payload.data;
        state.loadingQA = false;
        console.log(state.fetchedQA);
      })
      .addCase(getQAAnswers.rejected, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(postQuestion.pending, (state, action) => {
        // for loading
        state.loadingQA = true;
      })
      .addCase(postQuestion.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("post done");
        state.loadingQA = false;
      })
      .addCase(postQuestion.rejected, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(postThenGet.pending, (state, action) => {
        // for loading
        state.loadingQA = true;
      })
      .addCase(postThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("post then get done");
        state.loadingQA = false;
      })
      .addCase(postThenGet.rejected, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(postStudentAnswer.pending, (state, action) => {
        // for loading
        state.loadingQA = true;
      })
      .addCase(postStudentAnswer.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("post then get done");
        state.loadingQA = false;
      })
      .addCase(postStudentAnswer.rejected, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(postStudentAnswerThenGet.pending, (state, action) => {
        // for loading
        state.loadingQA = true;
      })
      .addCase(postStudentAnswerThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("post then get done");
        state.loadingQA = false;
      })
      .addCase(postStudentAnswerThenGet.rejected, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(postInstructorAnswer.pending, (state, action) => {
        // for loading
        state.loadingQA = true;
      })
      .addCase(postInstructorAnswer.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("post then get done");
        state.loadingQA = false;
      })
      .addCase(postInstructorAnswer.rejected, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(postInstructorAnswerThenGet.pending, (state, action) => {
        // for loading
        state.loadingQA = true;
      })
      .addCase(postInstructorAnswerThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("post then get done");
        state.loadingQA = false;
      })
      .addCase(postInstructorAnswerThenGet.rejected, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(deleteQA.pending, (state, action) => {
        // for loading
        state.loadingQA = true;
      })
      .addCase(deleteQA.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("delete done");
        state.loadingQA = false;
      })
      .addCase(deleteQA.rejected, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(deleteQAThenGet.pending, (state, action) => {
        // for loading
        state.loadingQA = true;
      })
      .addCase(deleteQAThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("get done");
        state.loadingQA = false;
      })
      .addCase(deleteQAThenGet.rejected, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(deleteMessage.pending, (state, action) => {
        // for loading
        state.loadingQA = true;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("delete done");
        state.loadingQA = false;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(deleteMessageThenGet.pending, (state, action) => {
        // for loading
        state.loadingQA = true;
      })
      .addCase(deleteMessageThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("get done");
        state.loadingQA = false;
      })
      .addCase(deleteMessageThenGet.rejected, (state, action) => {
        // state.name = action.payload;
      }),
});

export const { setfetchedQA } = QASlice.actions;
export default QASlice.reducer;
