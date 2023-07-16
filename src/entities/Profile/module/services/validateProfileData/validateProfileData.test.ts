import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../types/profile';

const data = {
    firstname: 'Михаил',
    lastname: 'Тяпков',
    age: 21,
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Cheboksary',
    username: 'Admin',
};

describe('validateProfileData', () => {
    test('No validation errors', async () => {
        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });
    test('without first and last name', async () => {
        const result = validateProfileData({ ...data, lastname: '', firstname: '' });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });
    test('incorrect age', async () => {
        const result = validateProfileData({ ...data, age: undefined });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });
    test('incorrect username', async () => {
        const result = validateProfileData({ ...data, username: '' });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USERNAME,
        ]);
    });
    test('incorrect city', async () => {
        const result = validateProfileData({ ...data, city: '' });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_CITY,
        ]);
    });
    test('incorrect all', async () => {
        const result = validateProfileData({
            ...data, lastname: '', firstname: '', age: undefined, city: '', username: '',
        });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_CITY,
            ValidateProfileError.INCORRECT_USERNAME,
        ]);
    });
});
