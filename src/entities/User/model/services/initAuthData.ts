import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localestorage';

import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (newJsonSettings, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;

        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (!userId) {
            return rejectWithValue('No userId');
        }

        try {
            const response = await dispatch(
                getUserDataByIdQuery(userId),
            ).unwrap();

            return response;
        } catch (error) {
            if (__PROJECT__ === 'frontend') {
                console.log(error);
            }
            return rejectWithValue('error');
        }
    },
);
