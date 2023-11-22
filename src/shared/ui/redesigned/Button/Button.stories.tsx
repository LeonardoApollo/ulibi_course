import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
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
Primary.decorators = [NewDesignDecorator];

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    variant: 'clear',
};
Clear.decorators = [NewDesignDecorator];

export const Outline = Template.bind({});
Outline.args = {
    children: 'Text',
    variant: 'outline',
};
Outline.decorators = [NewDesignDecorator];

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
    children: 'Text',
    variant: 'outline',
    size: 'size_l',
};
OutlineSizeL.decorators = [NewDesignDecorator];

export const OutlineSizeXL = Template.bind({});
OutlineSizeXL.args = {
    children: 'Text',
    variant: 'outline',
    size: 'size_xl',
};
OutlineSizeXL.decorators = [NewDesignDecorator];

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'Text',
    variant: 'outline',
};
OutlineDark.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const BackgroundTheme = Template.bind({});
BackgroundTheme.args = {
    children: 'Text',
    variant: 'background',
};

export const Square = Template.bind({});
Square.args = {
    children: '>',
    variant: 'background',
    square: true,
};
Square.decorators = [NewDesignDecorator];

export const SquareM = Template.bind({});
SquareM.args = {
    children: '>',
    variant: 'background',
    square: true,
};
SquareM.decorators = [NewDesignDecorator];

export const SquareL = Template.bind({});
SquareL.args = {
    children: '>',
    variant: 'background',
    square: true,
    size: 'size_l',
};
SquareL.decorators = [NewDesignDecorator];

export const SquareXL = Template.bind({});
SquareXL.args = {
    children: '>',
    variant: 'background',
    square: true,
    size: 'size_xl',
};
SquareXL.decorators = [NewDesignDecorator];

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'Text',
    variant: 'background',
    disabled: true,
};
Disabled.decorators = [NewDesignDecorator];
