import { configureStore } from "@reduxjs/toolkit";
import AuthorizationReducer from "./Slices/AuthorizationSlice"

const store = configureStore({
    reducer: {
        Authorization: AuthorizationReducer
    }
})

export default store