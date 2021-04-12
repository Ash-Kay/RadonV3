import axios from "axios";
import { authService } from "../app/state/auth/auth.service";
import { getBaseUrl } from "./baseUrl";

const main = axios.create({
    baseURL: getBaseUrl(),
});

main.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            authService.logout();
        }
        throw error;
    }
);

export { main };
