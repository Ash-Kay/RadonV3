import { Store } from "@datorama/akita";
import { AxiosError } from "axios";

export const handleResponseError = (error: AxiosError, store: Store): void => {
    store.setLoading(false);
    store.setError(error.response);
    console.error(error);
};
