import axios from "axios"

// export const BASE_URL = "http://localhost:8080";

// export const BASE_URL = "http://blog-app-env.eba-jprayzxb.ap-south-1.elasticbeanstalk.com";
export const BASE_URL = "https://cricket-blog-app-backend.onrender.com";

export const myAxios = axios.create({
    baseURL: BASE_URL
})


const getHeaders = () => {
    if (localStorage.getItem("data") != null)
        return JSON.parse(localStorage.getItem("data")).token;
    else return null;
}

export const myAxiosWithAuth = axios.create({
    baseURL: BASE_URL
});

myAxiosWithAuth.interceptors.request.use((config) => {
    const token = getHeaders();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    console.error(error);
    throw(error);
});
