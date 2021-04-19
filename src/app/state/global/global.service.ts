import { GlobalStore, globalStore } from "./global.store";
import { GlobalQuery, globalQuery } from "./global.query";

export class GlobalService {
    constructor(private store: GlobalStore, private query: GlobalQuery) {}

    readonly currentLoadedPage$ = this.query.currentLoadedPage$;
    readonly hasMorePages$ = this.query.hasMorePages$;

    public setCurrentLoadedPage = (currentLoadedPage: number): void => {
        this.store.update({ currentLoadedPage });
    };

    public setHasMorePages = (hasMorePages: boolean): void => {
        if (this.query.getValue().hasMorePages !== hasMorePages) this.store.update({ hasMorePages });
    };
}

export const globalService = new GlobalService(globalStore, globalQuery);
