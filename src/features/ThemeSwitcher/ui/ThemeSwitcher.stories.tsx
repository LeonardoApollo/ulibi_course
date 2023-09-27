import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { ThemeSwithcer } from './ThemeSwithcer';

export default {
    title: 'widget/ThemeSwithcer',
    component: ThemeSwithcer,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ThemeSwithcer>;

const Template: ComponentStory<typeof ThemeSwithcer> = (args) => (
    <ThemeSwithcer {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
