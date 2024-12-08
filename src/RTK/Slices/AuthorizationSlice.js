import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";
import axios from "axios";

const initialstate = {
  user_id: null,
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  smthnHappening: false,
};

export const StudentLoginAPI = createAsyncThunk(
  "AuthorizationSlice/StudentLogin",
  async (userData, { getState, rejectWithValue }) => {
    console.log(userData);
    // api call
    try {
      const response = await YomacApi.post("student_sign_in", {
        username: userData.username,
        password: userData.password,
      });
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const StudentRegisterAPI = createAsyncThunk(
  "AuthorizationSlice/StudentRegister",
  async (formData, { getState, rejectWithValue }) => {
    // api call
    console.log(formData);
    try {
      const response = await YomacApi.post("student_sign_up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("New student added:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      return rejectWithValue(error);
    }
  }
);

export const InstructorLoginAPI = createAsyncThunk(
  "AuthorizationSlice/InstructorLogin",
  async (userData, { getState, rejectWithValue }) => {
    console.log(userData);
    // api call
    try {
      const response = await YomacApi.post("instrutor_sign_in", {
        headers: {
          "Content-Type": "application/json",
        },
        username: userData.username,
        password: userData.password,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const InstructorRegisterAPI = createAsyncThunk(
  "AuthorizationSlice/InstructorRegister",
  async (formData, { getState, rejectWithValue }) => {
    // api call
    try {
      const response = await YomacApi.post("instrutor_sign_up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("New Instuctor added:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      return rejectWithValue(error);
    }
  }
);

const AuthorizationSlice = createSlice({
  name: "Authorization",
  initialState: initialstate,
  reducers: {
    login(state, action) {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(StudentLoginAPI.pending, (state, action) => {
        // for loading
        state.smthnHappening = true;
      })
      .addCase(StudentLoginAPI.fulfilled, (state, action) => {
        // console.log(action.payload.data);
        const data = action.payload.data;
        state.token = data.token;
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data?.user_data?.role);
        state.user_id = data.user_data.id;
        state.role = data.user_data.role;
        state.smthnHappening = false;
        // console.log(state.token);
        // console.log(state.role);
      })
      .addCase(StudentLoginAPI.rejected, (state, action) => {
        // state.name = action.payload;
        console.log(action.payload);
        state.smthnHappening = false;
      })
      .addCase(InstructorLoginAPI.pending, (state, action) => {
        // for loading
        state.smthnHappening = true;
      })
      .addCase(InstructorLoginAPI.fulfilled, (state, action) => {
        // console.log(action.payload.data);
        const data = action.payload.data;
        state.token = data.token;
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data?.user_data?.role);
        state.user_id = data.user_data.id;
        state.role = data.user_data.role;
        state.smthnHappening = false;
        // console.log(state.token);
        // console.log(state.role);
      })
      .addCase(InstructorLoginAPI.rejected, (state, action) => {
        // state.name = action.payload;
        state.smthnHappening = false;
        console.log(action);
      })
      .addCase(StudentRegisterAPI.pending, (state, action) => {
        // for loading
        state.smthnHappening = true;
      })
      .addCase(StudentRegisterAPI.fulfilled, (state, action) => {
        console.log(action.payload);
        // const data = action.payload.data;
        // state.token = data.token;
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("role", data?.user_data?.role);
        // state.user_id = data.user_data.id;
        // state.role = data.user_data.role;
        state.smthnHappening = false;
        // console.log(state.token);
        // console.log(state.role);
      })
      .addCase(StudentRegisterAPI.rejected, (state, action) => {
        // state.name = action.payload;
        state.smthnHappening = false;
        console.log(action);
      })
      .addCase(InstructorRegisterAPI.pending, (state, action) => {
        // for loading
        state.smthnHappening = true;
      })
      .addCase(InstructorRegisterAPI.fulfilled, (state, action) => {
        console.log(action.payload);
        // const data = action.payload.data;
        // state.token = data.token;
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("role", data?.user_data?.role);
        // state.user_id = data.user_data.id;
        // state.role = data.user_data.role;
        state.smthnHappening = false;
        // console.log(state.token);
        // console.log(state.role);
      })
      .addCase(InstructorRegisterAPI.rejected, (state, action) => {
        // state.name = action.payload;
        state.smthnHappening = false;
        console.log(action);
      }),
});

export const { login } = AuthorizationSlice.actions;
export default AuthorizationSlice.reducer;
