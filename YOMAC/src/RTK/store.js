import { configureStore } from "@reduxjs/toolkit";
import AuthorizationReducer from "./Slices/AuthorizationSlice"

export const store = configureStore({
    reducer: {
        Authorization: AuthorizationReducer
    }
})