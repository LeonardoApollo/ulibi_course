import { ReactElement } from 'react';

import { ScrollToolbar } from '@/widgets/ScrollToolbar';

import { AppRoutes } from '@/shared/const/router';
import { useScrollToTopPosition } from '@/shared/hooks/useScrollToTopPosition';
import { useRouteChange } from '@/shared/libs/router/useRouteChange';

export function useAppToolbar() {
    const appRoute = useRouteChange();
    const scrollPosition = useScrollToTopPosition();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
    };

    if (scrollPosition) {
        return toolbarByAppRoute[appRoute];
    }

    return undefined;
}
