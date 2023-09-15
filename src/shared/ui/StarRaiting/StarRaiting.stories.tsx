import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StarRaiting } from './StarRaiting';

export default {
    title: 'shared/StarRaiting',
    component: StarRaiting,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StarRaiting>;

const Template: ComponentStory<typeof StarRaiting> = (args) => <StarRaiting {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
