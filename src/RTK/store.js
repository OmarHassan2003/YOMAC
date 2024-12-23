import { configureStore } from "@reduxjs/toolkit";
import AuthorizationReducer from "./Slices/AuthorizationSlice";
import CourseSlice from "./Slices/CourseSlice";
import StudentSlice from "./Slices/StudentSlice";
import WhiteboardSlice from "./Slices/WhiteboardSlice";
import QASlice from "./Slices/QASlice";
import QuizSlice from "./Slices/QuizSlice";
import TransactionSlice from "./Slices/TransactionSlice";
import CategorySlice from "./Slices/CategorySlice";
import SearchSlice from "./Slices/SearchSlice";
import FeedbackSlice from "./Slices/FeedbackSlice";
import StatSlice from "./Slices/StatSlice";

const store = configureStore({
  reducer: {
    Authorization: AuthorizationReducer,
    Course: CourseSlice,
    student: StudentSlice,
    whiteBoard: WhiteboardSlice,
    qa: QASlice,
    quiz: QuizSlice,
    transaction: TransactionSlice,
    category: CategorySlice,
    Search: SearchSlice,
    feedback: FeedbackSlice,
    stat: StatSlice,
  },
});

export default store;
