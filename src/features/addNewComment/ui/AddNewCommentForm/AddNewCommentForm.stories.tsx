import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import AddNewCommentForm from './AddNewCommentForm';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/AddNewCommentForm',
    component: AddNewCommentForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddNewCommentForm>;

const Template: ComponentStory<typeof AddNewCommentForm> = (args) => <AddNewCommentForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    onSendComment: action('onSendComment'),
};
Normal.decorators = [
    StoreDecorator({}),
];
