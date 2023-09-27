import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Drawer } from './Drawer';

export default {
    title: 'shared/Drawer',
    component: Drawer,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children:
        'Lorem ipsum fish text: qwertywsdhfiaaluefgsldabdlasgfaewraiuhf egfsdjf weQYG  DFGYWQdas dasdadsae',
};

export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children:
        'Lorem ipsum fish text: qwertywsdhfiaaluefgsldabdlasgfaewraiuhf egfsdjf weQYG  DFGYWQdas dasdadsae',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
