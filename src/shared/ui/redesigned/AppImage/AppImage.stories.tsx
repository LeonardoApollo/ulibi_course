import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

import { Skeleton } from '../Skeleton';
import { Text } from '../Text';
import { AppImage } from './AppImage';

export default {
    title: 'shared/redesigned/AppImage',
    component: AppImage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppImage>;

const Template: ComponentStory<typeof AppImage> = (args) => (
    <AppImage {...args} />
);

const errorFallback = (
    <Text align="center" variant="error" text="Ошибка загрузки изображения" />
);
const fallback = <Skeleton width="100%" height={250} />;

export const Primary = Template.bind({});
Primary.args = {
    errorFallback,
    fallback,
    alt: 'Primary Img',
    src: 'https://play-lh.googleusercontent.com/IHMe-gJ6G4rf5-TVlDZOtcW-3EDBwJ4p2qomk86O6qkjjutl5ePczGmyqCDOvhGJ1w=w240-h480-rw',
};
Primary.decorators = [NewDesignDecorator];

export const Error = Template.bind({});
Error.args = {
    errorFallback,
    fallback,
    alt: 'Primary Img',
    src: 'https://play-lh.googleusercontent.com/IHMe-gJ6G4rf5-TVlDZOtcW-3EDBwJ4p2qomk86O6qkjjutl5ePczGmyqCDOvhGJ1w=w240-h480-rw/оно-сломано-специально',
};
Error.decorators = [NewDesignDecorator];
