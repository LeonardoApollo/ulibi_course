import { BugButton } from 'app/providers/ErrorBoundary';
import React from 'react';
import { useTranslation } from 'react-i18next';

function Main() {
    const { t } = useTranslation('main');
    return (
        <div>
            <BugButton />
            {t('Главная страница')}
        </div>
    );
}

export default Main;
