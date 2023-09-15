import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AvatarImg from '@/shared/ui/Avatar/2e2e2125ee53807c2d77b34773f84b5c.jpg';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { AvatarDropdown } from './AvatarDropdown';

export default {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => <div style={{ padding: 220 }}><Story /></div>,
    ],
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />;

const authData = {
    id: '1',
    username: 'abs',
    avatar: AvatarImg,
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
    user: {
        authData,
    },
})];
