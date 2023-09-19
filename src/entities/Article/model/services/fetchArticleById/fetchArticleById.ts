import { createAsyncThunk } from '@reduxjs/toolkit';

import { Article } from '../../types/article';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetcArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
    'articleDetails/fetcArticleById',
    async (articleId, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<Article>(`/articles/${articleId}`, {
                params: {
                    _expand: 'user',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
);
