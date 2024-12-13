import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
  whiteboard: [],
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
    console.log(userData);
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.delete("accept_whiteboard_item", {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        course_id: userData.course_id,
        item_id: userData.item_id,
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
          "Content-Type": "application/json",
          token: token,
        },
        course_id: userData.course_id,
        item_id: userData.item_id,
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
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        // state.name = action.payload;
        const data = action.payload.data;
        state.whiteboard = data.whiteboard;
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        // state.name = action.payload;
      })
      .addCase(getWhiteboard.pending, (state, action) => {
        // for loading
      })
      .addCase(getWhiteboard.fulfilled, (state, action) => {
        // state.name = action.payload;
        const data = action.payload.data;
        state.whiteboard = data.whiteboard;
      })
      .addCase(getWhiteboard.rejected, (state, action) => {
        // state.name = action.payload;
      })

      .addCase(rejectRequest.pending, (state, action) => {
        // for loading
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        // state.name = action.payload;
        const data = action.payload.data;
        state.whiteboard = data.whiteboard;
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        // state.name = action.payload;
      }),
});

export default WhiteboardSlice.reducer;
