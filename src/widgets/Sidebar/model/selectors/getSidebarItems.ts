import { createSelector } from '@reduxjs/toolkit';

import { SidebarItemType } from '../types/sidebar';

import { getUserAuthData } from '@/entities/User';
import AbotIcon from '@/shared/assets/icons/About.svg';
import ArticlesIcon from '@/shared/assets/icons/Articles.svg';
import MainIcon from '@/shared/assets/icons/Home.svg';
import { RoutePath } from '@/shared/const/router';

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
