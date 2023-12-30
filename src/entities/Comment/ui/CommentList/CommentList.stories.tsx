import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

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

const comments = [
    {
        id: '1',
        text: 'hello world',
        user: {
            email: 'abc',
            token: '123',
            id: '1',
            username: 'Admin',
            avatar: 'https://i.pinimg.com/originals/2e/2e/21/2e2e2125ee53807c2d77b34773f84b5c.jpg',
        },
    },
    {
        id: '2',
        text: 'Comment 2',
        user: {
            email: 'abc',
            token: '123',
            id: '1',
            username: 'User',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3xJHuQ_yC7x2ia0Mgs02sAeK_i4jwR4ipg&usqp=CAU',
        },
    },
];

export const Normal = Template.bind({});
Normal.args = {
    comments,
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
    comments,
};
NormalRedesigned.decorators = [NewDesignDecorator];

export const Loading = Template.bind({});
Loading.args = {
    comments: [],
    isLoading: true,
};
