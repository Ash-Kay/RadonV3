export interface GlobalState {
    hasMorePages: boolean;
    currentLoadedPage: number;
    //showlogin, can be used to propt to login when click on auth related button, also private route can be used for this
}

export function createInitialState(): GlobalState {
    return GLOBAL_INITIAL_STATE;
}

export const GLOBAL_INITIAL_STATE: GlobalState = {
    hasMorePages: true,
    currentLoadedPage: 0,
};
