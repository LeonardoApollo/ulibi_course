import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { profileReducer } from '../../model/slice/profileSlice';

import { EditableProfileCard } from './EditableProfileCard';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
import { $api } from '@/shared/api/api';
import { componentRender } from '@/shared/libs/tests/componentRender/componentRender';

const profile: Profile = {
    id: '1',
    firstname: 'admin',
    lastname: 'ultra',
    age: 365,
    currency: Currency.USD,
    country: Country.Kazakhstan,
    city: 'Kazan',
    username: 'ultraAdmin228',
};

const options: any = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,

        },
        user: {
            authData: { id: '1', username: 'admin' },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('features/EditableProfileCard', () => {
    test('readonly state should switch', async () => {
        act(() => componentRender(<EditableProfileCard id="1" />, options));

        await act(async () => { await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton')); });

        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
    });

    test('inputs should resets', async () => {
        act(() => componentRender(<EditableProfileCard id="1" />, options));
        await act(async () => { await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton')); });

        await act(async () => { await userEvent.clear(screen.getByTestId('ProfileCard.firstname')); });
        await act(async () => { await userEvent.clear(screen.getByTestId('ProfileCard.lastname')); });

        await act(async () => { await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user'); });
        await act(async () => { await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user'); });

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

        await act(async () => { await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton')); });

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('ultra');
    });

    test('should return validation error', async () => {
        act(() => componentRender(<EditableProfileCard id="1" />, options));

        await act(async () => { await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton')); });

        await act(async () => { await userEvent.clear(screen.getByTestId('ProfileCard.firstname')); });

        await act(async () => { await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton')); });

        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
    });

    test('should send PUT request to server', async () => {
        const mockPutReq = jest.spyOn($api, 'put').mockResolvedValue('');
        act(() => componentRender(<EditableProfileCard id="1" />, options));

        await act(async () => { await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton')); });

        await act(async () => { await userEvent.clear(screen.getByTestId('ProfileCard.firstname')); });

        await act(async () => { await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user'); });

        await act(async () => { await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton')); });

        expect(mockPutReq).toHaveBeenCalled();
    });
});
