import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { db } from '@/shared/config/firebase/firebase';

import { ValidateArticleError } from '../consts/consts';

export const deleteArticle = createAsyncThunk<
    void,
    string,
    ThunkConfig<ValidateArticleError[]>
>('article/deleteArticle', async (articleId, { extra, rejectWithValue }) => {
    try {
        const articleRef = doc(db, 'articles', articleId);
        const articleSnap = await getDoc(articleRef);
        if (!articleSnap.exists) {
            throw new Error('article dont exist');
        }
        await deleteDoc(articleRef);
        return undefined;
        // const response = await extra.api.delete<Article>(
        //     `/articles/${articleId}`,
        // );

        // if (!response.data) {
        //     throw new Error();
        // }

        // return response.data;
    } catch (error) {
        if (__PROJECT__ === 'frontend') {
            console.log(error);
        }
        return rejectWithValue([ValidateArticleError.SERVER_ERROR]);
    }
});
