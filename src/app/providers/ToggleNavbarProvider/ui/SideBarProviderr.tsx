import { ReactNode, useEffect, useMemo, useState } from 'react';

import { useJsonSettings } from '@/entities/User';

import { LOCAL_STORAGE_NAVBAR_STATE } from '@/shared/const/localestorage';
import { SideBarContext } from '@/shared/libs/context/ToggleSideBarContext';
import { SideBarState } from '@/shared/types/sidebar';

interface NavbarProviderProps {
    initialState?: SideBarState;
    children: ReactNode;
}

const fallbackState = localStorage.getItem(
    LOCAL_STORAGE_NAVBAR_STATE,
) as SideBarState;

const SideBarProvider = (props: NavbarProviderProps) => {
    const { initialState, children } = props;
    const { sideBarState } = useJsonSettings();
    const [isSideBarIsited, setSideBarIsited] = useState(false);
    const [SideBarState, setSideBarState] = useState(
        sideBarState || initialState || fallbackState || 'open',
    );

    useEffect(() => {
        if (!isSideBarIsited && sideBarState) {
            setSideBarState(sideBarState);
            setSideBarIsited(true);
        }
    }, [sideBarState, isSideBarIsited]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_NAVBAR_STATE, SideBarState);
    }, [SideBarState]);

    const defaultProps = useMemo(
        () => ({
            SideBarState,
            setSideBarState,
        }),
        [SideBarState],
    );

    return (
        <SideBarContext.Provider value={defaultProps}>
            {children}
        </SideBarContext.Provider>
    );
};

export default SideBarProvider;
