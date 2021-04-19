import { StoreConfig, Store } from "@datorama/akita";
import { GlobalState, createInitialState } from "./global.model";

@StoreConfig({ name: "global" })
export class GlobalStore extends Store<GlobalState> {
    constructor() {
        super(createInitialState());
    }
}

export const globalStore = new GlobalStore();
