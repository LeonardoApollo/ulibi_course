import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

import { classNames } from '@/shared/libs/classNames/classNames';

import cls from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = ({ className }: ForbiddenPageProps) => {
    const { t } = useTranslation('forbidden');

    return (
        <Page
            data-testid="ForbiddenPage"
            className={classNames(cls.ForbiddenPage, {}, [className])}
        >
            {t('У вас нет доступа к этой странице')}
        </Page>
    );
};

export default memo(ForbiddenPage);
