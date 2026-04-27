import axios from "axios";

const axiosInstance = axios.create({
  // Backend Url
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default axiosInstance;
