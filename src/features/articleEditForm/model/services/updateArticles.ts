import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article } from '@/entities/Article';

import { getArticleEditData } from '../selectors/getArticleEditFormData';

export const updateArticleData = createAsyncThunk<
    Article,
    string,
    ThunkConfig<string>
>(
    'article/updateArticleData',
    async (id, { extra, rejectWithValue, getState }) => {
        const articleEditFormData = getArticleEditData(getState());
        if (!articleEditFormData?.id || !articleEditFormData?.user) {
            throw new Error();
        }
        const updatedArticle: Article = {
            id,
            title: articleEditFormData.title,
            subtitle: articleEditFormData.subtitle,
            img: articleEditFormData.img,
            views: articleEditFormData.views,
            createdAt: articleEditFormData.createdAt,
            type: articleEditFormData.type,
            blocks: articleEditFormData.blocks,
            user: articleEditFormData.user,
        };
        try {
            const response = await extra.api.patch<Article>(
                `/articles/${id}`,
                updatedArticle,
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
    },
);
