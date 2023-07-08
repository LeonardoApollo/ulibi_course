import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { classNames } from 'shared/libs/classNames/classNames';
import { SidebarItemType } from '../../model/items';
import cls from './SideBarItem.module.scss';

interface SideBarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SideBarItem: FC<SideBarItemProps> = ({ item, collapsed }) => {
    const { t } = useTranslation();

    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>
                {t(item.text)}
            </span>
        </AppLink>
    );
};
