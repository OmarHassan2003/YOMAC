import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";
import { act } from "react";
import toast from "react-hot-toast";

const initialstate = {
  object: {},
  loadingStu: false,
  message: "",
};

export const getStudent = createAsyncThunk(
  "StudentSlice/getStudent",
  async (_, { getState, rejectWithValue }) => {
    // api call
    console.log("a7ma amr");
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.get(`get_user_data`, {
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

export const updateUser = createAsyncThunk(
  "StudentSlice/updateUser",
  async (userData, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.put(`update_user_data`, userData, {
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

export const deleteCourse = createAsyncThunk(
  "StudentSlice/deleteCourse",
  async (id, { getState, rejectWithValue }) => {
    console.log("a7ma amr2");

    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.delete(`delete_course/${id}`, {
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

export const increaseBalance = createAsyncThunk(
  "StudentSlice/increaseBalance",
  async (newBalance, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    const { balance } = getState().student.object;
    try {
      const response = await YomacApi.post(
        `increase_student_balance/${newBalance + balance}`,
        "",
        {
          headers: {
            token: token,
          },
        }
      );
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const newIncreaseBalance = createAsyncThunk(
  "StudentSlice/newIncreaseBalance",
  async (newBalance, { getState, rejectWithValue }) => {
    // api call
    const { token } = getState().Authorization;
    try {
      const response = await YomacApi.post(
        `increase_student_balance/${newBalance}`,
        "",
        {
          headers: {
            token: token,
          },
        }
      );
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const increaseThenGet = createAsyncThunk(
  "StudentSlice/deleteCourseThenGet",
  async (newBalance, { dispatch, getState, rejectWithValue }) => {
    await dispatch(newIncreaseBalance(newBalance));
    return dispatch(getStudent());
  }
);

export const deleteCourseThenGet = createAsyncThunk(
  "StudentSlice/deleteCourseThenGet",
  async (newBalance, { dispatch, getState, rejectWithValue }) => {
    console.log("a7ma amr1");
    await dispatch(deleteCourse(id));
    return dispatch(getStudent());
  }
);

export const updateUserThenGet = createAsyncThunk(
  "StudentSlice/updateUSerThenGet",
  async (data, { dispatch, getState, rejectWithValue }) => {
    await dispatch(updateUser(data));
    return dispatch(getStudent());
  }
);

const StudentSlice = createSlice({
  name: "Student",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getStudent.pending, (state, action) => {
        // for loading
        state.loadingStu = true;
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log(action.payload.data);
        const data = action.payload.data;
        localStorage.setItem("username", data?.username);
        state.object = data;
        console.log(state);
        state.loadingStu = false;
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.loadingStu = false;
        // state.name = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loadingStu = true;
        // for loading
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log(action.payload.data);
        const data = action.payload.data;
        state.object = data;
        console.log(state);
        state.loadingStu = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        // state.name = action.payload;
        state.loadingStu = false;
      })
      .addCase(updateUserThenGet.pending, (state, action) => {
        // for loading
        state.loadingStu = true;
      })
      .addCase(updateUserThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("al donia 7lwa");
        state.loadingStu = false;
      })
      .addCase(updateUserThenGet.rejected, (state, action) => {
        // state.name = action.payload;
        state.loadingStu = false;
      })
      .addCase(deleteCourse.pending, (state, action) => {
        // for loading
        state.loadingVid = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("Course deleted");
        state.loadingVid = false;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        // state.name = action.payload;
        // console.log("Assignment Failed to be Created");
        state.loadingVid = false;
      })
      .addCase(deleteCourseThenGet.pending, (state, action) => {
        // for loading
        state.loadingStu = true;
      })
      .addCase(deleteCourseThenGet.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log("al donia 7lwa");
        state.loadingStu = false;
      })
      .addCase(deleteCourseThenGet.rejected, (state, action) => {
        // state.name = action.payload;
        state.loadingStu = false;
      })
      .addCase(increaseBalance.pending, (state, action) => {
        // for loading
        state.loadingStu = true;
      })
      .addCase(increaseBalance.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log(action.payload);
        state.loadingStu = false;
      })
      .addCase(increaseBalance.rejected, (state, action) => {
        // state.name = action.payload;
        state.loadingStu = false;
      })
      .addCase(newIncreaseBalance.pending, (state, action) => {
        // for loading
        state.loadingStu = true;
      })
      .addCase(newIncreaseBalance.fulfilled, (state, action) => {
        // state.name = action.payload;
        console.log(action.payload);
        toast.success("Balance increased successfully")
        state.loadingStu = false;
      })
      .addCase(newIncreaseBalance.rejected, (state, action) => {
        // state.name = action.payload;
        toast.error("Error")
        state.loadingStu = false;
      }),
});

export default StudentSlice.reducer;
