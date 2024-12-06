import axios from "axios"

const YomacApi = axios.create({
    baseURL: "http://yomac.azurewebsites.net/api/auth/",
})
//l

// function GetNumber() {
//     return 5;
// }

// YomacApi.interceptors.response.use(
//     (response) => {
//       // console.log(response.data);
//       return response;
//     },
//     async (error) => {
//         const dispatch_action = error.config.customMetaData.dispatch_action + "()";
//         try {
//             if (error.response?.data?.detail === "refresh token is expired") {
//               console.log("To login page");
//               // Redirect to login or perform logout
//             } else if (error.response?.data?.detail === "token is expired") {
//               const dispatch_action = error.config?.customMetaData?.dispatch_action;
//               if (dispatch_action) {
//                 await store.dispatch(); // Refresh tokens or re-authenticate
//                 return await store.dispatch(eval(dispatch_action)); // Retry the original action
//               }
//             }
//         } catch (err) {
//           return err;
//         }
//         return Promise.reject(error); // Propagate the error for further handling
//     }
// )

export default YomacApi;