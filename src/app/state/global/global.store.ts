import { GlobalState, GlobalStateData, GLOBAL_INITIAL_STATE } from "./global.model";
import create, { SetState, GetState } from "zustand";
import { devtools } from "zustand/middleware";

const useGlobalStore = create<GlobalState>(
    devtools((set: SetState<GlobalState>, get: GetState<GlobalState>) => {
        return {
            data: GLOBAL_INITIAL_STATE,
            updateState: (newState: Partial<GlobalStateData>) => {
                set((state) => ({ data: { ...state.data, ...newState } }));
            },
        };
    }, "GlobalStore")
);

export default useGlobalStore;
