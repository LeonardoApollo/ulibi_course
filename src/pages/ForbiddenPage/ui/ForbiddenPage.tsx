import { memo } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';
import cls from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = ({ className }: ForbiddenPageProps) => {
    const { t } = useTranslation('forbidden');

    return (
        <Page className={classNames(cls.ForbiddenPage, {}, [className])}>
            {t('У вас нет доступа к этой странице')}
        </Page>
    );
};

export default memo(ForbiddenPage);
