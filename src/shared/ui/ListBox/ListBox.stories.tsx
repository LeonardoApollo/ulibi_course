import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

const options = [
    { value: '1', content: '123' },
    { value: '12', content: 'abc', disabled: true },
    { value: '123', content: '345' },
];

function onChangeHandler(value: string) {
    return {};
}

export const Normal = Template.bind({});
Normal.args = {
    defaultValue: 'Dropdown',
    value: 'Dropdown',
    label: 'Dropdown',
    items: options,
};
