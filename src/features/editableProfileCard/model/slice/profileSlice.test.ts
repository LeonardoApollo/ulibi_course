import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { ProfileSchema, ValidateProfileError } from '../types/editableProfileCardSchema';
import { profileActions, profileReducer } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const data = {
    firstname: 'Михаил',
    lastname: 'Тяпков',
    age: 21,
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Cheboksary',
    username: 'Admin',
};

describe('profileSlice', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadonly(true),
        )).toEqual({ readonly: true });
    });

    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = { data };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit(),
        )).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data,
        });
    });

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = { form: { username: 'Admin' } };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.updateProfile({
                username: 'User',
            }),
        )).toEqual({
            form: { username: 'User' },
        });
    });

    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = { isLoading: false, validateErrors: [ValidateProfileError.SERVER_ERROR] };
        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending,
        )).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test('test update profile service fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = { isLoading: true };
        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(data, ''),
        )).toEqual({
            isLoading: false,
            readonly: true,
            validateErrors: undefined,
            form: data,
            data,
        });
    });
});
