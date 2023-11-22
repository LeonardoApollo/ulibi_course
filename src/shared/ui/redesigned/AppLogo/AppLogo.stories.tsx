import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

import { AppLogo } from './AppLogo';

export default {
    title: 'shared/redesigned/AppLogo',
    component: AppLogo,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppLogo>;

const Template: ComponentStory<typeof AppLogo> = (args) => (
    <AppLogo {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [NewDesignDecorator];

export const Small = Template.bind({});
Small.args = { collapsed: true };
Small.decorators = [NewDesignDecorator];
