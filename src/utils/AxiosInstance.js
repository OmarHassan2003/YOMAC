import axios from "axios";

const YomacApi = axios.create({
  baseURL: "https://yomac.azurewebsites.net/api/auth/",
});

// function GetNumber() {
//     return 5;
// }

YomacApi.interceptors.request.use((request) => {
  // console.log(request);
  return request;
});

export default YomacApi;
