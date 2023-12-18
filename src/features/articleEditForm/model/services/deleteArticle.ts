import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article } from '@/entities/Article';

export const deleteArticle = createAsyncThunk<
    Article,
    string,
    ThunkConfig<string>
>('article/deleteArticle', async (articleId, { extra, rejectWithValue }) => {
    try {
        const response = await extra.api.delete<Article>(
            `/articles/${articleId}`,
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (error) {
        if (__PROJECT__ === 'frontend') {
            console.log(error);
        }
        return rejectWithValue('error');
    }
});
