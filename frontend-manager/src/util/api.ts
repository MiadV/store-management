import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export default function api() {
    const api = axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/v1`,
        // withCredentials: true,
        headers: {
            Authorization: `Bearer ${localStorage.getItem(
                `${process.env.REACT_APP_LOCAL_STORAGE_PREFIX}-token`
            )}`,
            Accept: "application/json",
        },
    });

    // Request interceptor. Runs before your request reaches the server
    const onRequest = (config: AxiosRequestConfig<any>) => {
        if (
            (config.method === "post" ||
                config.method === "put" ||
                config.method === "delete") &&
            !Cookies.get("XSRF-TOKEN")
        ) {
            return setCSRFToken().then(() => config);
        }
        return config;
    };

    const setCSRFToken = () => {
        console.log("getting CSRF");
        return api.get(
            `${process.env.REACT_APP_API_BASE_URL}/sanctum/csrf-cookie`
        );
    };

    api.interceptors.request.use(onRequest);

    return api;
}
