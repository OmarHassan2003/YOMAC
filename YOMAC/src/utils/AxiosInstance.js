import axios from "axios"
import { store } from "../RTK/store"

const YomacApi = axios.create({
    baseURL: "http://localhost:3500/api/auth/",
}, { withCredentials: true })

function GetNumber() {
    return 5;
}

// YomacApi.interceptors.response.use(
//     (response) => {
//         console.log(response.data);
//         return response;
//     },
//     async (error) => {
//         console.log(error);
//         const dispatch_action = error.config.customMetaData.dispatch_action + "()";
//         if(error.response.data.detail === "refresh token is expired") {
//             console.log("To login page");
//         }
//         else if(error.response.data.detail === "token is expired") {
//             await store.dispatch();
//             return await store.dispatch(eval(dispatch_action));
//         }
//         return error;
//     }
// )

export default YomacApi;