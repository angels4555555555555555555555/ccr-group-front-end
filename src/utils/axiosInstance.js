import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.ccrgroupgmbh.com/api",
    withCredentials: true, 
});

export default axiosInstance;