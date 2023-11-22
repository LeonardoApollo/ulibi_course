import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Text } from './Text';

export default {
    title: 'shared/redesigned/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Title fish text',
    text: 'Text lorem ipsum',
};
Primary.decorators = [NewDesignDecorator];

export const Error = Template.bind({});
Error.args = {
    title: 'Title fish text',
    text: 'Text lorem ipsum',
    variant: 'error',
};
Error.decorators = [NewDesignDecorator];

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'Title fish text',
};
OnlyTitle.decorators = [NewDesignDecorator];

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'Text lorem ipsum',
};
OnlyText.decorators = [NewDesignDecorator];

export const Dark = Template.bind({});
Dark.args = {
    title: 'Title fish text',
    text: 'Text lorem ipsum',
};
Dark.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const ErrorDark = Template.bind({});
ErrorDark.args = {
    title: 'Title fish text',
    text: 'Text lorem ipsum',
    variant: 'error',
};
ErrorDark.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const DarkOnlyTitle = Template.bind({});
DarkOnlyTitle.args = {
    title: 'Title fish text',
};
DarkOnlyTitle.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const DarkOnlyText = Template.bind({});
DarkOnlyText.args = {
    title: 'Title fish text',
    text: 'Text lorem ipsum',
};
DarkOnlyText.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
    title: 'Title fish text',
    text: 'Text lorem ipsum',
    size: 'size_l',
};
SizeL.decorators = [NewDesignDecorator];

export const SizeM = Template.bind({});
SizeM.args = {
    title: 'Title fish text',
    text: 'Text lorem ipsum',
    size: 'size_m',
};
SizeM.decorators = [NewDesignDecorator];

export const SizeS = Template.bind({});
SizeS.args = {
    title: 'Title fish text',
    text: 'Text lorem ipsum',
    size: 'size_s',
};
SizeS.decorators = [NewDesignDecorator];
