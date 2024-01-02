// Из-за перехода на firebase сущность профиля была объеденина с сущностью пользователя
// Теперь нет необходимости в инициализации через отдельный эндпинт
// Код оставлен в качестве примера

// import { Country } from '@/entities/Country';
// import { Currency } from '@/entities/Currency';

// import { TestAsyncThunk } from '@/shared/libs/tests/TestAsyncThunk/TestAsyncThunk';

// import { fetchProfileData } from './fetchProfileData';

// const data = {
//     firstname: 'Михаил',
//     lastname: 'Тяпков',
//     age: 21,
//     currency: Currency.RUB,
//     country: Country.Russia,
//     city: 'Cheboksary',
//     username: 'Admin',
// };

describe('fetchProfileData', () => {
    test('bulk', async () => {
        expect(1).toBe(1);
    });
    // test('success', async () => {
    //     const thunk = new TestAsyncThunk(fetchProfileData);
    //     thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    //     const result = await thunk.callThunk('1');

    //     expect(thunk.api.get).toHaveBeenCalled();
    //     expect(result.meta.requestStatus).toBe('fulfilled');
    //     expect(result.payload).toEqual(data);
    // });
    // test('error', async () => {
    //     const thunk = new TestAsyncThunk(fetchProfileData);
    //     thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    //     const result = await thunk.callThunk('1');

    //     expect(result.meta.requestStatus).toBe('rejected');
    // });
});
export {};
