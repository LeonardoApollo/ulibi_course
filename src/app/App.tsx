import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { Suspense, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { User, getUserInited, userActions } from '@/entities/User';

import { db, getUserFromFirestore } from '@/shared/config/firebase/firebase';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useTheme } from '@/shared/hooks/useTheme';
import { MainLayout } from '@/shared/layout';
import { AppLoaderLayout } from '@/shared/layout/AppLoaderLayout';
import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';

import { useAppToolbar } from './lib/useAppToolbar';
import { withTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/routers/index';

const App = memo(() => {
    const { theme } = useTheme();
    const auth = getAuth();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const toolbar = useAppToolbar();

    useEffect(() => {
        if (!inited) {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userData: User = await getUserFromFirestore(
                        db,
                        'users',
                        user.uid,
                        user.refreshToken,
                    );
                    dispatch(userActions.setAuthData(userData));
                    dispatch(userActions.setInit());
                } else {
                    dispatch(userActions.setInit());
                }
            });
        }
    }, [dispatch, inited, auth]);

    if (!inited) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <div
                        id="app"
                        className={classNames('app_redesigned', {}, [theme])}
                    >
                        <AppLoaderLayout />
                    </div>
                }
                off={<PageLoader />}
            />
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div id="app" className={classNames('app', {}, [theme])}>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            }
            on={
                <div
                    id="app"
                    className={classNames('app_redesigned', {}, [theme])}
                >
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                            toolbar={toolbar}
                        />
                    </Suspense>
                </div>
            }
        />
    );
});

export default withTheme(App);
