import axios from "axios";
import { getToken } from "./utils";

const clienteAxios = axios.create({
    // baseURL: "http://localhost:8001/api/",
    // baseURL: "http://localhost:8000/api",
    // traer de .env
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});


clienteAxios.interceptors.request.use(
    function (config) {
        const token = getToken();
        if (token) {
            // config.headers["authorization"] = `Bearer ${token}`;
            // config.headers["authorization"] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MDI4NDgwMzAsImV4cCI6MTcwMjg1MTYzMCwibmJmIjoxNzAyODQ4MDMwLCJqdGkiOiJzVXBwSGpveFM5NWg3WjJDIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.ASsrwmAwgRHxvGQb2aoqPKPcDg1-SUPtucWpAByxTkc`;

        }
        return config;
    },
    function (error) {
        if (error.response.status === 401) {
            // window.location = "/login";
            window.location = "/";

        }
        return Promise.reject(error);
    }
);

clienteAxios.interceptors.response.use(
    function (response) {
        if (response.data.codigo === 401 || response.data.status === "Token is Expired") {
            window.location = "/";
        }

        if (response.data.codigo === 403) {
            //error de permisos
        }


        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            // window.location = "/login";
            window.location = "/";

        } else {
            return Promise.reject(error);
        }
    }
);

export default clienteAxios;