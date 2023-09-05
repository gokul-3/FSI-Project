import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accesstoken')}`;
export default instance;
