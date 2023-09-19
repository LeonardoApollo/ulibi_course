import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import LoginForm from './LoginForm';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({
    loginForm: { username: '123', password: 'abc' },
})];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [StoreDecorator({
    loginForm: { username: '123', password: 'abc', error: 'error' },
})];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [StoreDecorator({
    loginForm: { username: '123', password: 'abc', isLoading: true },
})];
