import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Rating } from '@/entities/Rating';
import { UserRole } from '@/entities/User';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import ProfileRating from './ProfileRating';

export default {
    title: 'features/ProfileRating',
    component: ProfileRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileRating>;

const Template: ComponentStory<typeof ProfileRating> = (args) => (
    <ProfileRating {...args} />
);

const articleRating: Rating = {
    rate: 0,
    feedback: 'Хороший человек',
};

export const Rated = Template.bind({});
Rated.args = {
    profileId: '1',
};
Rated.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '2',
                username: 'User',
                roles: [UserRole.USER],
            },
        },
    }),
];
Rated.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=2&profileId=1`,
            method: 'GET',
            status: 200,
            response: [{ ...articleRating, rate: 3 }],
        },
        {
            url: `${__API__}/profile-ratings`,
            method: 'POST',
            status: 201,
            responce: [],
        },
    ],
};

export const NotRated = Template.bind({});
NotRated.args = {
    profileId: '1',
};
NotRated.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '2',
                username: 'User',
                roles: [UserRole.USER],
            },
        },
    }),
];
NotRated.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=2&profileId=1`,
            method: 'GET',
            status: 200,
            response: [articleRating],
        },
        {
            url: `${__API__}/profile-ratings`,
            method: 'POST',
            status: 201,
            responce: [],
        },
    ],
};

export const OwnProfile = Template.bind({});
OwnProfile.args = {
    profileId: '2',
};
OwnProfile.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '2',
                username: 'User',
                roles: [UserRole.USER],
            },
        },
    }),
];
OwnProfile.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=2&profileId=2`,
            method: 'GET',
            status: 200,
            response: [articleRating],
        },
        {
            url: `${__API__}/profile-ratings`,
            method: 'POST',
            status: 201,
            responce: [],
        },
    ],
};
