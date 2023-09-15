import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RaitingCard } from './RaitingCard';

export default {
    title: 'entities/RaitingCard',
    component: RaitingCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RaitingCard>;

const Template: ComponentStory<typeof RaitingCard> = (args) => <RaitingCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    hasFeedback: true,
    feedbackTitle: 'Ваши впечетления',
    title: 'Оставьте отзыв',
};
