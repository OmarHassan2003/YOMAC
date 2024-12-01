import { configureStore } from "@reduxjs/toolkit";
import AuthorizationReducer from "./Slices/AuthorizationSlice"
import CourseSlice from "./Slices/CourseSlice";

const store = configureStore({
  reducer: {
    Authorization: AuthorizationReducer,
    Course: CourseSlice,
  },
});

export default store