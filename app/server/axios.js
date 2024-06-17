import axios from 'axios';
const baseURL = process.env.BASEURL
const accessToken = process.env.API_KEY_SECRET

// Create an Axios instance
console.log(baseURL, "baseURL")
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
