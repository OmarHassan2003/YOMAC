import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  whiteboard: [],
  loadingWhite: false,
};

export const getWhiteboard = createAsyncThunk(
  "WhiteboardSlice/getWhiteboard",
  async (id, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_course_whiteboard/${id}`, {
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
export const acceptRequest = createAsyncThunk(
  "AuthorizationSlice/acceptRequest",
  async (userData, { getState, rejectWithValue }) => {
    console.log(userData.course_id, userData.item_id);
    // api call
    const { token } = getState().Authorization;
    console.log(token);

    try {
      const response = await YomacApi.delete("accept_whiteboard_item", {
        headers: {
          token: token,
        },
        data: {
          course_id: userData.course_id,
          item_id: userData.item_id,
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
export const rejectRequest = createAsyncThunk(
  "AuthorizationSlice/rejectRequest",
  async (userData, { getState, rejectWithValue }) => {
    console.log(userData);
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.delete("reject_whiteboard_item", {
        headers: {
          token: token,
        },
        data: {
          course_id: userData.course_id,
          item_id: userData.item_id,
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

const WhiteboardSlice = createSlice({
  name: "Whiteboard",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(acceptRequest.pending, (state, action) => {
        // for loading
        state.loadingWhite = true;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        // state.name = action.payload;
        const data = action.payload.data;
        state.whiteboard = data.whiteboard;
        state.loadingWhite = false;
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        // state.name = action.payload;
        state.loadingWhite = false;
      })
      .addCase(getWhiteboard.pending, (state, action) => {
        // for loading
        state.loadingWhite = true;
      })
      .addCase(getWhiteboard.fulfilled, (state, action) => {
        // state.name = action.payload;
        const data = action.payload.data;
        state.whiteboard = data.whiteboard;
        state.loadingWhite = false;
      })
      .addCase(getWhiteboard.rejected, (state, action) => {
        // state.name = action.payload;
        state.loadingWhite = false;
      })

      .addCase(rejectRequest.pending, (state, action) => {
        // for loading
        state.loadingWhite = true;
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        // state.name = action.payload;
        const data = action.payload.data;
        state.whiteboard = data.whiteboard;
        state.loadingWhite = false;
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        // state.name = action.payload;
        state.loadingWhite = false;
      }),
});

export default WhiteboardSlice.reducer;
