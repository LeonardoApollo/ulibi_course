// import { LoginSchema } from '../types/loginSchema';
// import { loginActions, loginReducer } from './loginSlice';

// Тест отключен в связи с переходом на настоящий backend Firebase и оставлен в качестве примера
describe('loginSlice', () => {
    test('buffer', () => {
        expect(1).toBe(1);
    });
    // test('test set username', () => {
    //     const state: DeepPartial<LoginSchema> = { username: 'admin' };
    //     expect(
    //         loginReducer(
    //             state as LoginSchema,
    //             loginActions.setUsername('newUser'),
    //         ),
    //     ).toEqual({ username: 'newUser' });
    // });
    // test('test set password', () => {
    //     const state: DeepPartial<LoginSchema> = { password: '123' };
    //     expect(
    //         loginReducer(
    //             state as LoginSchema,
    //             loginActions.setPassword('12345'),
    //         ),
    //     ).toEqual({ password: '12345' });
    // });
    // test('test set email', () => {
    //     const state: DeepPartial<LoginSchema> = { email: 'example@test.com' };
    //     expect(
    //         loginReducer(
    //             state as LoginSchema,
    //             loginActions.setEmail('google@gmail.com'),
    //         ),
    //     ).toEqual({ email: 'google@gmail.com' });
    // });
});

export {};
