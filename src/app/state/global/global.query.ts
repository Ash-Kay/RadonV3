import { Query } from "@datorama/akita";
import { GlobalState } from "./global.model";
import { globalStore, GlobalStore } from "./global.store";

export class GlobalQuery extends Query<GlobalState> {
    hasMorePages$ = this.select((state) => state.hasMorePages);
    currentLoadedPage$ = this.select((state) => state.currentLoadedPage);

    constructor(protected store: GlobalStore) {
        super(store);
    }
}

export const globalQuery = new GlobalQuery(globalStore);
