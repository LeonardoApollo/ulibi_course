import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import SettingPage from './SettingPage';

export default {
    title: 'pages/SettingPage',
    component: SettingPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SettingPage>;

const Template: ComponentStory<typeof SettingPage> = (args) => (
    <SettingPage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
