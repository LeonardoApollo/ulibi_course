import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { StoreProvider } from '@/app/providers/StoreProvider';
import '@/app/styles/index.scss';

import App from './app/App';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import SideBarProvider from './app/providers/ToggleNavbarProvider';
import './shared/config/firebase/firebase';
import './shared/config/i18n/i18n';
import { ForceUpdateProvider } from './shared/render/forceUpdate';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение',
    );
}
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <SideBarProvider>
                    <ForceUpdateProvider>
                        <App />
                    </ForceUpdateProvider>
                </SideBarProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
