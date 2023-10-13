import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { getUserInited, initAuthData } from '@/entities/User';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useTheme } from '@/shared/hooks/useTheme';
import { classNames } from '@/shared/libs/classNames/classNames';

import { AppRouter } from './providers/routers/index';

function App() {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) {
        return <PageLoader />;
    }

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
