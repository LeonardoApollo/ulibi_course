import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';

import AbotIconDeprecated from '@/shared/assets/icons/About.svg';
import ArticlesIconDeprecated from '@/shared/assets/icons/Articles.svg';
import AritclesIcon from '@/shared/assets/icons/ArticlesRedesigned.svg';
import MainIconDeprecated from '@/shared/assets/icons/Home.svg';
import MainIcon from '@/shared/assets/icons/HomeRedesigned.svg';
import AboutIcon from '@/shared/assets/icons/InfoRedesigned.svg';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/libs/features';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => MainIconDeprecated,
                on: () => MainIcon,
            }),
            text: 'Главная',
        },
        {
            path: getRouteAbout(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => AbotIconDeprecated,
                on: () => AboutIcon,
            }),
            text: 'О сайте',
        },
    ];

    if (userData) {
        sidebarItemList.push({
            path: getRouteArticles(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => ArticlesIconDeprecated,
                on: () => AritclesIcon,
            }),
            text: 'Статьи',
            authOnly: true,
        });
    }
    return sidebarItemList;
});
