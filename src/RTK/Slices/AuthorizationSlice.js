import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";
import axios from "axios";

const initialstate = {
  user_id: null,
  token: localStorage.getItem("token"),
  role: "",
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

export const GenerateNewToken = createAsyncThunk(
  "AuthorizationSlice/generateNewToken",
  async (_, { getState, rejectWithValue }) => {
    // api call
    try {
      const response = await axios.post("http://localhost:3500/api/auth/generate_new_token", '', {
        headers: {
          refresh: localStorage.getItem("refresh")
        },
      }, { withCredentials:true });
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const StudentRegisterAPI = createAsyncThunk(
  "AuthorizationSlice/StudentRegister",
  async (_, { getState, rejectWithValue }) => {
    // api call
    try {
      const response = await YomacApi.post("student_sign_up", {
        username: "mb",
        password: "123456",
      });
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
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
  async (_, { getState, rejectWithValue }) => {
    // api call
    try {
      const response = await YomacApi.post("instrutor_sign_up", {
        username: "mb",
        password: "123456",
      });
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
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
      })
      .addCase(StudentLoginAPI.fulfilled, (state, action) => {
        // console.log(action.payload.data);
        const data = action.payload.data;
        state.token = data.token;
        localStorage.setItem("token", data.token);
        state.user_id = data.user_data.id;
        state.role = data.user_data.role;
        // console.log(state.token);
        // console.log(state.role);
      })
      .addCase(StudentLoginAPI.rejected, (state, action) => {
        // state.name = action.payload;
        console.log(action.payload);
      })
      .addCase(InstructorLoginAPI.pending, (state, action) => {
        // for loading
      })
      .addCase(InstructorLoginAPI.fulfilled, (state, action) => {
        // console.log(action.payload.data);
        const data = action.payload.data;
        state.token = data.token;
        localStorage.setItem("token", data.token);
        state.user_id = data.user_data.id;
        state.role = data.user_data.role;
        // console.log(state.token);
        // console.log(state.role);
      })
      .addCase(InstructorLoginAPI.rejected, (state, action) => {
        // state.name = action.payload;
        console.log(action);
      })

      .addCase(GenerateNewToken.pending, (state, action) => {
        // for loading
      })
      .addCase(GenerateNewToken.fulfilled, (state, action) => {
        // console.log(action.payload.data);
        const data = action.payload.data;
        console.log(data);
        state.token = data.token;
        localStorage.setItem("token", data.token);
        state.user_id = data.user_data.id;
        state.role = data.role;
        // console.log(state.token);
        // console.log(state.role);
      })
      .addCase(GenerateNewToken.rejected, (state, action) => {
        // state.name = action.payload;
        console.log(action);
      }),
});

export const { login } = AuthorizationSlice.actions;
export default AuthorizationSlice.reducer;
