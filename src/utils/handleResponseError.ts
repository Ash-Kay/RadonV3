import { AxiosError } from "axios";

export const handleResponseError = (error: AxiosError): void => {
    //set global error or something
    console.error(error);
};
