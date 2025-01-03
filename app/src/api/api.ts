import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: `${window.location.origin}/api/`,
});


export default axiosInstance;
