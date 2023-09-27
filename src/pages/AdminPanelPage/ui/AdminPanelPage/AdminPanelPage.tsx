import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

import { classNames } from '@/shared/libs/classNames/classNames';

import cls from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = (props: AdminPanelPageProps) => {
    const { className } = props;
    const { t } = useTranslation('admin');

    return (
        <Page
            data-testid="AdminPanelPage"
            className={classNames(cls.AdminPanelPage, {}, [className])}
        >
            {t('Админ панель')}
        </Page>
    );
};

export default memo(AdminPanelPage);
