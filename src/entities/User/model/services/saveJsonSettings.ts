import { createAsyncThunk } from '@reduxjs/toolkit';
import { DocumentReference, doc, updateDoc } from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { db } from '@/shared/config/firebase/firebase';

import { getUserAuthData } from '../selectors/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { JsonSettings } from '../types/jsonSettings';

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;
    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    if (!userData) {
        return rejectWithValue('No userData');
    }

    try {
        const dataRef: DocumentReference = doc(db, 'users', userData.id);
        const jsonSettings: JsonSettings = {
            ...currentSettings,
            ...newJsonSettings,
        };
        await updateDoc(dataRef, {
            jsonSettings,
        });
        return jsonSettings;
        // const response = await dispatch(
        //     setJsonSettingsMutation({
        //         userId: userData.id,
        //         jsonSettings: {
        //             ...currentSettings,
        //             ...newJsonSettings,
        //         },
        //     }),
        // ).unwrap();

        // if (!response.jsonSettings) {
        //     return rejectWithValue('No jsonSettings');
        // }

        // return response.jsonSettings;
    } catch (error) {
        if (__PROJECT__ === 'frontend') {
            console.log(error);
        }
        return rejectWithValue('error');
    }
});
