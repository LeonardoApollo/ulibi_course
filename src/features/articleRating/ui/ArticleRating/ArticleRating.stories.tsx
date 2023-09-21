import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import withMock from 'storybook-addon-mock';

import ArticleRating from './ArticleRating';

import { Rating } from '@/entities/Rating';
import { UserRole } from '@/entities/User';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

const articleRating: Rating = {
    rate: 0,
    feedback: 'Хорошая статья',
};

export const Rated = Template.bind({});
Rated.args = {
    articleId: '1',
};
Rated.decorators = [StoreDecorator({
    user: {
        authData: {
            id: '2',
            username: 'User',
            roles: [UserRole.USER],
        },
    },
    articleDetails: {
        data: {
            id: '1',
            user: {
                id: '1',
            },
        },
    },
})];
Rated.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=2&articleId=1`,
            method: 'GET',
            status: 200,
            response: [{ ...articleRating, rate: 3 }],
        },
        {
            url: `${__API__}/article-ratings`,
            method: 'POST',
            status: 201,
            responce: [],
        },
    ],
};

export const NotRated = Template.bind({});
NotRated.args = {
    articleId: '1',
};
NotRated.decorators = [StoreDecorator({
    user: {
        authData: {
            id: '2',
            username: 'User',
            roles: [UserRole.USER],
        },
    },
    articleDetails: {
        data: {
            id: '1',
            user: {
                id: '1',
            },
        },
    },
})];
NotRated.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=2`,
            method: 'GET',
            status: 200,
            response: [articleRating],
        },
        {
            url: `${__API__}/article-ratings`,
            method: 'POST',
            status: 201,
            responce: [],
        },
    ],
};

export const OwnArticle = Template.bind({});
OwnArticle.args = {
    articleId: '1',
};
OwnArticle.decorators = [StoreDecorator({
    user: {
        authData: {
            id: '2',
            username: 'User',
            roles: [UserRole.USER],
        },
    },
    articleDetails: {
        data: {
            id: '1',
            user: {
                id: '2',
            },
        },
    },
})];
OwnArticle.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=2`,
            method: 'GET',
            status: 200,
            response: [articleRating],
        },
        {
            url: `${__API__}/article-ratings`,
            method: 'POST',
            status: 201,
            responce: [],
        },
    ],
};
