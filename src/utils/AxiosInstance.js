import axios from "axios";


// function GetNumber() {
//     return 5;
// }

YomacApi.interceptors.request.use((request) => {
  // console.log(request);
  return request;
});

export default YomacApi;
