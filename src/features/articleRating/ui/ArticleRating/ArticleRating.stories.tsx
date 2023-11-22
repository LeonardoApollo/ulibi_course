import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Rating } from '@/entities/Rating';
import { UserRole } from '@/entities/User';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import ArticleRating from './ArticleRating';

export default {
    title: 'features/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => (
    <ArticleRating {...args} />
);

const articleRating: Rating = {
    rate: 0,
    feedback: 'Хорошая статья',
};

const user = {
    authData: {
        id: '2',
        username: 'User',
        roles: [UserRole.USER],
    },
};

const articleDetails = {
    data: {
        id: '1',
        user: {
            id: '1',
        },
    },
};

const RatedParams = {
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

const NotRatedParams = {
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

export const Rated = Template.bind({});
Rated.args = {
    articleId: '1',
};
Rated.decorators = [
    StoreDecorator({
        user,
        articleDetails,
    }),
];
Rated.parameters = RatedParams;

export const RatedRedesigned = Template.bind({});
RatedRedesigned.args = {
    articleId: '1',
};
RatedRedesigned.decorators = [
    NewDesignDecorator,
    StoreDecorator({
        user,
        articleDetails,
    }),
];
RatedRedesigned.parameters = RatedParams;

export const NotRated = Template.bind({});
NotRated.args = {
    articleId: '1',
};
NotRated.decorators = [
    StoreDecorator({
        user,
        articleDetails,
    }),
];
NotRated.parameters = NotRatedParams;

export const NotRatedRedesigned = Template.bind({});
NotRatedRedesigned.args = {
    articleId: '1',
};
NotRatedRedesigned.decorators = [
    NewDesignDecorator,
    StoreDecorator({
        user,
        articleDetails,
    }),
];
NotRatedRedesigned.parameters = NotRatedParams;

export const OwnArticle = Template.bind({});
OwnArticle.args = {
    articleId: '1',
};
OwnArticle.decorators = [
    StoreDecorator({
        user,
        articleDetails,
    }),
];
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
