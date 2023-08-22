import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page';

const Main = memo(() => {
    const { t } = useTranslation('main');

    return (
        <Page>
            {t('Главная страница')}
        </Page>
    );
});

export default Main;
