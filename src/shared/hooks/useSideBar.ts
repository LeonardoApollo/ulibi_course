import { useContext } from 'react';

import { SideBarContext } from '../libs/context/ToggleSideBarContext';
import { SideBarState } from '../types/sidebar';

interface UseSideBarResult {
    toggleSideBarState: (saveAction?: (value: SideBarState) => void) => void;
    SideBarState: SideBarState;
}

export function useSideBar(): UseSideBarResult {
    const { SideBarState, setSideBarState } = useContext(SideBarContext);

    const toggleSideBarState = (saveAction?: (value: SideBarState) => void) => {
        let newSideBarState: SideBarState;
        switch (SideBarState) {
            case 'open':
                newSideBarState = 'close';
                break;
            case 'close':
                newSideBarState = 'open';
                break;
            default:
                newSideBarState = 'open';
        }
        setSideBarState?.(newSideBarState);
        saveAction?.(newSideBarState);
    };

    return { SideBarState: SideBarState || 'open', toggleSideBarState };
}
