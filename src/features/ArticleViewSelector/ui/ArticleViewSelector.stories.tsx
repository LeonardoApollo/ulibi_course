import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { ArticleViewSelector } from './ArticleViewSelector';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/ArticleViewSelector',
    component: ArticleViewSelector,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleViewSelector>;

const Template: ComponentStory<typeof ArticleViewSelector> = (args) => <ArticleViewSelector {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
