import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import AvatarImg from './2e2e2125ee53807c2d77b34773f84b5c.jpg';
import { Avatar } from './Avatar';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar >;

const Template: ComponentStory<typeof Avatar > = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    size: 150,
    src: AvatarImg,
};

export const Small = Template.bind({});
Small.args = {
    size: 50,
    src: AvatarImg,
};
