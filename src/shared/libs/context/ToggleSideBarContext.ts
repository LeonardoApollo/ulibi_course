import { createContext } from 'react';

import { SideBarState } from '@/shared/types/sidebar';

export interface ToggleSideBarContext {
    SideBarState?: SideBarState;
    setSideBarState?: (value: SideBarState) => void;
}

export const SideBarContext = createContext<ToggleSideBarContext>({});
