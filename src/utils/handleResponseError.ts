import { Store } from "@datorama/akita";

export const handleResponseError = (error: Error, store: Store) => {
    store.setLoading(false);
    store.setError(error);
    console.error(error);
};
