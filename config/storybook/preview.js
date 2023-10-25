import { addDecorator } from '@storybook/react';

import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { SuspenceDecorator } from '../../src/shared/config/storybook/SuspenceDecorator/SuspenceDecorator';
import { Theme } from '../../src/shared/const/theme';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: 'fullscreen',
    themes: {
        default: 'Light',
        list: [
            { name: 'Light', class: ['app', Theme.LIGHT], color: '#e8e8ea' },
            { name: 'Dark', class: ['app', Theme.DARK], color: '#090949' },
            { name: 'Orange', class: ['app', Theme.ORANGE], color: '#faf4fb'},
        ]
    }
};

addDecorator(StyleDecorator);
// Заменен плагином
// addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
addDecorator(SuspenceDecorator);
