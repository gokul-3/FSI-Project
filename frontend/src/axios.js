import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// const accessToken = localStorage.getItem('accesstoken');
// if (accessToken !== null)
//   instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
export default instance;
