import {
    Suspense, memo, useCallback,
} from 'react';

import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig';

import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

function AppRouter() {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => (
        <Route
            key={route.path}
            path={route.path}
            element={
                route.authOnly
                    ? <RequireAuth><div className="page-wrapper">{route.element}</div></RequireAuth>
                    : <div className="page-wrapper">{route.element}</div>
            }
        />
    ), []);
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(routeConfig).map(renderWithWrapper)}
            </Routes>
        </Suspense>
    );
}

export default memo(AppRouter);
