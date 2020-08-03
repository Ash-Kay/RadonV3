import axios from "axios";
import { authService } from "../app/state/auth/auth.service";

const main = axios.create({
    baseURL: "http://localhost:3000/api/v1",
});

main.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            console.log("Invalid token Loggin Out....");
            authService.logout();
        }
        return error;
    }
);

export { main };
