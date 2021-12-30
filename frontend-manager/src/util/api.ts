import axios from "axios";

export default function api() {
    const api = axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/v1`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem(
                `${process.env.REACT_APP_LOCAL_STORAGE_PREFIX}-token`
            )}`,
            Accept: "application/json",
        },
    });

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        // Not logged in
                        logout();
                        return Promise.reject(error?.response?.data);

                    case 419:
                        // Session expired
                        logout();
                        return Promise.reject(error?.response?.data);

                    case 422:
                        return Promise.reject(error?.response?.data);

                    case 503:
                        // Down for maintenance
                        logout();
                        return Promise.reject(error?.response?.data);

                    default:
                        // code block
                        return Promise.reject(error?.response?.data);
                }
            }

            return Promise.reject(error);
        }
    );

    return api;
}

const logout = async () => {
    localStorage.removeItem(
        `${process.env.REACT_APP_LOCAL_STORAGE_PREFIX}-token`
    );
    // window.location.reload();

    // console.log("logged out by axios inrecepter");
};
