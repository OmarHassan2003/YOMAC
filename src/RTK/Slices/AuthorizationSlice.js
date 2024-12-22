import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";
import axios from "axios";
import toast from "react-hot-toast";

const initialstate = {
  user_id: localStorage.getItem("user_id"),
  username: localStorage.getItem("username"),
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  smthnHappening: false,
  forgotPasswordRole: null,
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

export const forgotPassword = createAsyncThunk(
  "AuthorizationSlice/forgotPassword",
  async (email, { getState, rejectWithValue }) => {
    // api call
    const { forgotPasswordRole } = getState().Authorization;
    console.log(email, forgotPasswordRole);
    try {
      const response = await YomacApi.put("forgot_password", {
        headers: {
          "Content-Type": "application/json",
        },
        email: email,
        role: forgotPasswordRole,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const setNewPasswordAPI = createAsyncThunk(
  "AuthorizationSlice/setNewPasswordAPI",
  async (user_data, { getState, rejectWithValue }) => {
    // api call
    console.log(user_data);
    try {
      const response = await YomacApi.patch(
        "reset_password",
        {
          new_password: user_data.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: user_data.token,
          },
        }
      );
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
    setForgotPasswordRole(state, action) {
      state.forgotPasswordRole = action.payload;
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
        toast.success("Login Successful", {
          duration: 2000,
        });
        localStorage.setItem("user_id", data.user_data.id);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data?.user_data?.role);
        localStorage.setItem("username", data?.user_data?.username);
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
        toast.error(action.payload.response.data.error);
      })
      .addCase(InstructorLoginAPI.pending, (state, action) => {
        // for loading
        state.smthnHappening = true;
      })
      .addCase(InstructorLoginAPI.fulfilled, (state, action) => {
        // console.log(action.payload.data);
        const data = action.payload.data;
        state.token = data.token;
        localStorage.setItem("user_id", data.user_data.id);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data?.user_data?.role);
        localStorage.setItem("username", data?.user_data?.username);
        state.user_id = data.user_data.id;
        state.role = data.user_data.role;
        state.smthnHappening = false;
        toast.success("Login Successful", {
          duration: 2000,
        });
        // console.log(state.token);
        // console.log(state.role);
      })
      .addCase(InstructorLoginAPI.rejected, (state, action) => {
        // state.name = action.payload;
        state.smthnHappening = false;
        console.log(action);
        toast.error(action.payload.response.data.error);
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
        toast.success("Register Successful", {
          duration: 2000,
        });
        // console.log(state.token);
        // console.log(state.role);
      })
      .addCase(StudentRegisterAPI.rejected, (state, action) => {
        // state.name = action.payload;
        state.smthnHappening = false;
        let errorMsg = "";
        errorMsg =
          action.payload.response.data.errors.includes(
            "duplicate key value violates unique constraint"
          ) &&
          action.payload.response.data.errors.includes("username") &&
          "There already exists an account with this username";
        !errorMsg &&
          (errorMsg =
            action.payload.response.data.errors.includes(
              "duplicate key value violates unique constraint"
            ) &&
            action.payload.response.data.errors.includes("email") &&
            "There already exists an account with this email");

        console.log(action.payload);
        toast.error(errorMsg, {
          duration: 2000,
        });
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
        toast.success("Register Successful", {
          duration: 2000,
        });
        // console.log(state.token);
        // console.log(state.role);
      })
      .addCase(InstructorRegisterAPI.rejected, (state, action) => {
        // state.name = action.payload;
        state.smthnHappening = false;
        console.log(action);
        let errorMsg = "";
        errorMsg =
          action.payload.response.data.errors.includes(
            "duplicate key value violates unique constraint"
          ) &&
          action.payload.response.data.errors.includes("username") &&
          "There already exists an account with this username";
        !errorMsg &&
          (errorMsg =
            action.payload.response.data.errors.includes(
              "duplicate key value violates unique constraint"
            ) &&
            action.payload.response.data.errors.includes("email") &&
            "There already exists an account with this email");

        console.log(action.payload);
        toast.error(errorMsg, {
          duration: 2000,
        });
      })
      .addCase(forgotPassword.pending, (state, action) => {
        // for loading
        state.smthnHappening = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        console.log(action.payload);
        // const data = action.payload.data;
        // state.token = data.token;
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("role", data?.user_data?.role);
        // state.user_id = data.user_data.id;
        // state.role = data.user_data.role;
        state.smthnHappening = false;
        toast.success("An Email has been sent to you to reset your password", {
          duration: 2000,
        });
        // console.log(state.token);
        // console.log(state.role);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        // state.name = action.payload;
        state.smthnHappening = false;
        console.log(action);
        toast.error(action.payload.response.data.error);
      })
      .addCase(setNewPasswordAPI.pending, (state, action) => {
        // for loading
        state.smthnHappening = true;
      })
      .addCase(setNewPasswordAPI.fulfilled, (state, action) => {
        console.log(action.payload);
        // const data = action.payload.data;
        // state.token = data.token;
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("role", data?.user_data?.role);
        // state.user_id = data.user_data.id;
        // state.role = data.user_data.role;
        state.smthnHappening = false;
        toast.success("Password reset succesfully", {
          duration: 2000,
        });
        // console.log(state.token);
        // console.log(state.role);
      })
      .addCase(setNewPasswordAPI.rejected, (state, action) => {
        // state.name = action.payload;
        state.smthnHappening = false;
        console.log(action);
      }),
});

export const { setForgotPasswordRole } = AuthorizationSlice.actions;
export default AuthorizationSlice.reducer;
