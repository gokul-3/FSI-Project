import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
instance.interceptors.request.use(async function (config) {
  try {
    if (
      config.headers.Authorization === undefined 
    )
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "accesstoken"
      )}`;
  } catch (error) {
    console.log(error);
  }
  return config;
});
export default instance;
