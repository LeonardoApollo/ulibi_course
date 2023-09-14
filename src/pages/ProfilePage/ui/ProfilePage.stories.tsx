import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { EditableProfileCard } from '@/features/editableProfileCard';
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => (
    <ProfilePage {...args}>
        <EditableProfileCard id="1" />
    </ProfilePage>
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({
    profile: {
        form: {
            firstname: 'Михаил',
            lastname: 'Тяпков',
            age: 21,
            currency: Currency.RUB,
            country: Country.Russia,
            city: 'Cheboksary',
            username: 'Admin',
            avatar: 'https://i.pinimg.com/originals/2e/2e/21/2e2e2125ee53807c2d77b34773f84b5c.jpg',
        },
    },
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    profile: {
        form: {
            firstname: 'Михаил',
            lastname: 'Тяпков',
            age: 21,
            currency: Currency.RUB,
            country: Country.Russia,
            city: 'Cheboksary',
            username: 'Admin',
            avatar: 'https://i.pinimg.com/originals/2e/2e/21/2e2e2125ee53807c2d77b34773f84b5c.jpg',
        },
    },
})];
