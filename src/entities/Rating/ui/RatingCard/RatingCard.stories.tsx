import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

import { RatingCard } from './RatingCard';

export default {
    title: 'entities/RatingCard',
    component: RatingCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RatingCard>;

const Template: ComponentStory<typeof RatingCard> = (args) => (
    <RatingCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    hasFeedback: true,
    feedbackTitle: 'Ваши впечетления',
    title: 'Оставьте отзыв',
};

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = {
    hasFeedback: true,
    feedbackTitle: 'Ваши впечетления',
    title: 'Оставьте отзыв',
};
PrimaryRedesigned.decorators = [NewDesignDecorator];
