import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Notification } from '@/entities/Notification';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { NotificationButton } from './NotificationButton';

export default {
    title: 'features/NotificationButton',
    component: NotificationButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => (
    <NotificationButton {...args} />
);

const notification: Notification = {
    id: '1',
    title: 'Lorem Ipsum',
    description: 'Lorem Ipusm text',
    userId: '1',
};

const authData = {
    id: '1',
    username: 'abs',
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        user: {
            authData,
        },
    }),
];
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                { ...notification, id: '1' },
                { ...notification, id: '2' },
                { ...notification, id: '3' },
            ],
        },
    ],
};
