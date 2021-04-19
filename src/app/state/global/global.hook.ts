import { useObservable } from "@libreact/use-observable";
import { globalService } from "./global.service";

export function useGlobalMorePageHook(): [boolean] {
    const [globalFeed] = useObservable(globalService.hasMorePages$);
    return [globalFeed];
}

export function useCurrentLoadedPageHook(): [number] {
    const [globalFeed] = useObservable(globalService.currentLoadedPage$);
    return [globalFeed];
}

export function useIsSignInModalOpenHook(): [boolean] {
    const [isSignInModalOpen] = useObservable(globalService.isSignInModalOpen$);
    return [isSignInModalOpen];
}
