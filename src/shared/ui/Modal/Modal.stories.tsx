import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children: 'Lorem ipsum fish text: qwertywsdhfiaaluefgsldabdlasgfaewraiuhf egfsdjf weQYG  DFGYWQdas dasdadsae',
};

export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: 'Lorem ipsum fish text: qwertywsdhfiaaluefgsldabdlasgfaewraiuhf egfsdjf weQYG  DFGYWQdas dasdadsae',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
