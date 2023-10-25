import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Button } from './Button';

export default {
    title: 'shared/redesigned/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    variant: 'clear',
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'Text',
    variant: 'outline',
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
    children: 'Text',
    variant: 'outline',
    size: 'size_l',
};

export const OutlineSizeXL = Template.bind({});
OutlineSizeXL.args = {
    children: 'Text',
    variant: 'outline',
    size: 'size_xl',
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'Text',
    variant: 'outline',
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundTheme = Template.bind({});
BackgroundTheme.args = {
    children: 'Text',
    variant: 'background',
};

export const Square = Template.bind({});
Square.args = {
    variant: 'background',
    square: true,
};

export const SquareM = Template.bind({});
SquareM.args = {
    variant: 'background',
    square: true,
};

export const SquareL = Template.bind({});
SquareL.args = {
    variant: 'background',
    square: true,
    size: 'size_l',
};

export const SquareXL = Template.bind({});
SquareXL.args = {
    variant: 'background',
    square: true,
    size: 'size_xl',
};

export const Disabled = Template.bind({});
Disabled.args = {
    variant: 'background',
    disabled: true,
};
