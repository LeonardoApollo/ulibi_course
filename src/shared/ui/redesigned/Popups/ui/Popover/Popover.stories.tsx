import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

import { Button } from '../../../Button/Button';
import { Popover } from './Popover';

export default {
    title: 'shared/redesigned/Popups/Popover',
    component: Popover,
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
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
    <Popover {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    trigger: <Button>Open</Button>,
    direction: 'bottomLeft',
    children: <div>Lorem Ipusm text</div>,
};
Normal.decorators = [NewDesignDecorator];
