import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import YomacApi from "../../utils/AxiosInstance";

const initialstate = {
    name: ''
}

export const StudentLoginAPI = createAsyncThunk("AuthorizationSlice/StudentLogin", async (_, { getState, rejectWithValue }) => {
    // api call
    try {
        const response = await YomacApi.post("instrutor_sign_in", {
            "username": "mb",
            "password": "123456"
        });
        console.log(response);
        return response
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
})

const AuthorizationSlice = createSlice({
    name: 'Authorization',
    initialState: initialstate,
    reducers: {
        login(state, action) {
            state.name = action.payload;
        },
    },
    extraReducers: builder => 
        builder
            .addCase(StudentLoginAPI.fulfilled, (state, action) => {
                // state.name = action.payload;
            })
            .addCase(StudentLoginAPI.rejected, (state, action) => {
                // state.name = action.payload;
            })
})

export const { login } = AuthorizationSlice.actions;
export default AuthorizationSlice.reducer;