import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Rating } from '@/entities/Rating';
import { UserRole } from '@/entities/User';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
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

const RatedParams = {
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

const NotRatedParams = {
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

const user = {
    authData: {
        id: '2',
        username: 'User',
        roles: [UserRole.USER],
    },
};

export const Rated = Template.bind({});
Rated.args = {
    profileId: '1',
};
Rated.decorators = [
    StoreDecorator({
        user,
    }),
];
Rated.parameters = RatedParams;

export const RatedRedesigned = Template.bind({});
RatedRedesigned.args = {
    profileId: '1',
};
RatedRedesigned.decorators = [
    NewDesignDecorator,
    StoreDecorator({
        user,
    }),
];
RatedRedesigned.parameters = RatedParams;

export const NotRated = Template.bind({});
NotRated.args = {
    profileId: '1',
};
NotRated.decorators = [
    StoreDecorator({
        user,
    }),
];
NotRated.parameters = NotRatedParams;

export const NotRatedRedesigned = Template.bind({});
NotRatedRedesigned.args = {
    profileId: '1',
};
NotRatedRedesigned.decorators = [
    NewDesignDecorator,
    StoreDecorator({
        user,
    }),
];
NotRatedRedesigned.parameters = NotRatedParams;

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
