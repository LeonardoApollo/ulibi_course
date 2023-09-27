import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';

import AbotIcon from '@/shared/assets/icons/About.svg';
import ArticlesIcon from '@/shared/assets/icons/Articles.svg';
import MainIcon from '@/shared/assets/icons/Home.svg';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
} from '@/shared/const/router';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: MainIcon,
            text: 'Главная',
        },
        {
            path: getRouteAbout(),
            Icon: AbotIcon,
            text: 'О сайте',
        },
    ];

    if (userData) {
        sidebarItemList.push({
            path: getRouteArticles(),
            Icon: ArticlesIcon,
            text: 'Статьи',
            authOnly: true,
        });
    }
    return sidebarItemList;
});
