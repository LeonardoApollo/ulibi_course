import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { ArticlesDetailsPageHeader } from './ArticlesDetailsPageHeader';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'pages/ArticleDetails/ArticleDetailsPageHeader',
    component: ArticlesDetailsPageHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesDetailsPageHeader>;

const Template: ComponentStory<typeof ArticlesDetailsPageHeader> = (args) => <ArticlesDetailsPageHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({
    user: {
        _inited: true,
        authData: {
            id: '1',
            username: 'Admin',
            avatar: 'https://i.pinimg.com/originals/2e/2e/21/2e2e2125ee53807c2d77b34773f84b5c.jpg',
        },
    },
    articleDetails: {
        isLoading: false,
        data: {
            id: '1',
            title: 'Javascript news',
            subtitle: 'Что нового в JS за 2022 год',
            img: 'https://play-lh.googleusercontent.com/IHMe-gJ6G4rf5-TVlDZOtcW-3EDBwJ4p2qomk86O6qkjjutl5ePczGmyqCDOvhGJ1w=w240-h480-rw',
            views: 2023,
            createdAt: '26.02.2022',
            user: {
                id: '1',
                username: 'Admin',
                avatar: 'https://i.pinimg.com/originals/2e/2e/21/2e2e2125ee53807c2d77b34773f84b5c.jpg',
            },
        },
    },
})];
