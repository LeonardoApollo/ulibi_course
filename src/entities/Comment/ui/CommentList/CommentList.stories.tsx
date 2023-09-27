import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CommentList } from './CommentList';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
    <CommentList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    comments: [
        {
            id: '1',
            text: 'hello world',
            user: {
                id: '1',
                username: 'Admin',
                avatar: 'https://i.pinimg.com/originals/2e/2e/21/2e2e2125ee53807c2d77b34773f84b5c.jpg',
            },
        },
        {
            id: '2',
            text: 'Comment 2',
            user: {
                id: '1',
                username: 'User',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3xJHuQ_yC7x2ia0Mgs02sAeK_i4jwR4ipg&usqp=CAU',
            },
        },
    ],
};

export const Loading = Template.bind({});
Loading.args = {
    comments: [],
    isLoading: true,
};
