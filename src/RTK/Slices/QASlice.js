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
        console.log(action.payload.data);
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
      }),
});

export const { setfetchedQA } = QASlice.actions;
export default QASlice.reducer;
