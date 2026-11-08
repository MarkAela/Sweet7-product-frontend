
import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8090/api",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Automatically attach the login token when available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
