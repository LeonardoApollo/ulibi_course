import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article } from '@/entities/Article';

import { getArticleEditData } from '../selectors/getArticleEditFormData';

interface newArticle extends Omit<Article, 'id'> {
    userId: string;
}

export const createArticle = createAsyncThunk<
    newArticle,
    string,
    ThunkConfig<string>
>(
    'article/createArticle',
    async (userId, { extra, rejectWithValue, getState }) => {
        const articleEditFormData = getArticleEditData(getState());
        if (!articleEditFormData || !articleEditFormData?.user) {
            throw new Error('no ArticleData');
        }

        const Article: newArticle = {
            title: articleEditFormData.title,
            subtitle: articleEditFormData.subtitle,
            img: articleEditFormData.img,
            views: articleEditFormData.views,
            createdAt: articleEditFormData.createdAt,
            type: articleEditFormData.type,
            blocks: articleEditFormData.blocks,
            user: articleEditFormData.user,
            userId,
        };
        try {
            const response = await extra.api.post<newArticle>(
                `/articles`,
                Article,
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
