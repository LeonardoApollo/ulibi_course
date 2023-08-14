import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import MainIcon from 'shared/assets/icons/Home.svg';
import AbotIcon from 'shared/assets/icons/About.svg';
import ProfileIcon from 'shared/assets/icons/Profile.svg';
import ArticlesIcon from 'shared/assets/icons/Articles.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                Icon: MainIcon,
                text: 'Главная',
            },
            {
                path: RoutePath.about,
                Icon: AbotIcon,
                text: 'О сайте',
            },
        ];

        if (userData) {
            sidebarItemList.push(
                {
                    path: `${RoutePath.profile}${userData.id}`,
                    Icon: ProfileIcon,
                    text: 'Профиль',
                    authOnly: true,
                },
                {
                    path: RoutePath.articles,
                    Icon: ArticlesIcon,
                    text: 'Статьи',
                    authOnly: true,
                },
            );
        }
        return sidebarItemList;
    },
);
