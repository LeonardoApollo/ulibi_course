import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import AppRouter from './AppRouter';

import { UserRole } from '@/entities/User';
import { getRouteAdminPanel, getRouteMain, getRouteProfile } from '@/shared/const/router';
import { componentRender } from '@/shared/libs/tests/componentRender/componentRender';

describe('app/router/AppRouter', () => {
    test('Page should render', async () => {
        act(() => componentRender(<AppRouter />, {
            route: getRouteMain(),
        }));

        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });

    test('Page not found', async () => {
        act(() => componentRender(<AppRouter />, {
            route: '/loremipsum',
        }));

        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });

    test('Redirection to MainPage', async () => {
        act(() => componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
        }));

        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });

    test('Auth only page', async () => {
        await act(() => componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            initialState: {
                user: {
                    authData: {},
                    _inited: true,
                },
            },
        }));

        const page = await screen.findByTestId('ProfilePage');
        expect(page).toBeInTheDocument();
    });

    test('Forbidden page', async () => {
        act(() => componentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: {
                    authData: {},
                    _inited: true,
                },
            },
        }));

        const page = await screen.findByTestId('ForbiddenPage');
        expect(page).toBeInTheDocument();
    });

    test('Secured Page', async () => {
        act(() => componentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: {
                    authData: {
                        roles: [UserRole.ADMIN],
                    },
                    _inited: true,
                },
            },
        }));

        const page = await screen.findByTestId('AdminPanelPage');
        expect(page).toBeInTheDocument();
    });
});
