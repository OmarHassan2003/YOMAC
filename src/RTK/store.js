import { configureStore } from "@reduxjs/toolkit";
import AuthorizationReducer from "./Slices/AuthorizationSlice";
import CourseSlice from "./Slices/CourseSlice";
import StudentSlice from "./Slices/StudentSlice";
import WhiteboardSlice from "./Slices/WhiteboardSlice";

const store = configureStore({
  reducer: {
    Authorization: AuthorizationReducer,
    Course: CourseSlice,
    student: StudentSlice,
    whiteBoard: WhiteboardSlice,
  },
});

export default store;
