import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
instance.interceptors.request.use(function(){
  const accessToken = localStorage.getItem(accessToken)
  const config ={
    headers:{
      'Authorization': "Bearer "+ accessToken
    }
  }
  // console.log("adsd");
  return config
})
export default instance;
