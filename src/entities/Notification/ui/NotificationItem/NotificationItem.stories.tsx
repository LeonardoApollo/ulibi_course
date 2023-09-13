import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { Notification } from '../../model/types/types';
import { NotificationItem } from './NotificationItem';

export default {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

const notification: Notification = {
    id: '1',
    title: 'Lorem Ipsum',
    description: 'Lorem Ipusm text',
    userId: '1',
};

export const Normal = Template.bind({});
Normal.args = {
    item: notification,
};
