import axios from "axios";
import { signOut } from "next-auth/client";
import { getBaseUrl } from "./baseUrl";

const main = axios.create({
    baseURL: getBaseUrl(),
    withCredentials: true,
});

main.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            signOut();
        }
        throw error;
    }
);

export { main };
