export interface GlobalState {
    data: GlobalStateData;
    updateState: (newState: Partial<GlobalStateData>) => void;
}

export interface GlobalStateData {
    hasMorePages: boolean;
    currentLoadedPage: number;
    isLoginModalOpen: boolean;
}

export const GLOBAL_INITIAL_STATE: GlobalStateData = {
    hasMorePages: true,
    currentLoadedPage: 0,
    isLoginModalOpen: false,
};
