import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { Suspense } from 'react';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticleDetailsComments } from './ArticleDetailsComments';

export default {
    title: 'pages/ArticleDetails/ArticleDetailsComments',
    component: ArticleDetailsComments,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsComments>;

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => (
    <Suspense fallback="">
        <ArticleDetailsComments {...args} />
    </Suspense>
);

const articelDetailsPageData = {
    comments: {
        isLoading: false,
        error: undefined,
        ids: ['1', '2'],
        entities: {
            1: {
                id: '1',
                text: 'some comment 1',
                user: { id: '1', username: 'Admin' },
            },
            2: {
                id: '2',
                text: 'some comment 2',
                user: { id: '2', username: 'User' },
            },
        },
    },
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        articleDetailsPage: articelDetailsPageData,
    }),
];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [
    NewDesignDecorator,
    StoreDecorator({
        articleDetailsPage: articelDetailsPageData,
    }),
];
