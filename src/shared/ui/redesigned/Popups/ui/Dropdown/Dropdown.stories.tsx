import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Button } from '../../../../deprecated/Button/Button';
import { Dropdown } from './Dropdown';

export default {
    title: 'shared/redesigned/Popups/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 220 }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
    <Dropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    trigger: <Button>Open</Button>,
    direction: 'bottomLeft',
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
            disabled: true,
        },
        {
            content: 'third',
        },
    ],
};
