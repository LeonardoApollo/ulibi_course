import { createAsyncThunk } from '@reduxjs/toolkit';
import { DocumentReference, addDoc, collection, doc } from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article, ArticleType } from '@/entities/Article';

import { db } from '@/shared/config/firebase/firebase';

import { ValidateArticleError } from '../consts/consts';
import { getArticleEditData } from '../selectors/getArticleEditFormData';
import { validateArticleData } from './validateArticleData/validateArticleData';

interface newArticle extends Omit<Article, 'id' | 'user'> {
    userId: string;
    user: DocumentReference;
    nameIndex: string[];
}

export const createArticle = createAsyncThunk<
    void,
    string,
    ThunkConfig<ValidateArticleError[]>
>(
    'article/createArticle',
    async (userId, { extra, rejectWithValue, getState }) => {
        const articleEditFormData = getArticleEditData(getState());
        if (!articleEditFormData || !articleEditFormData?.user) {
            throw new Error('no ArticleData');
        }

        const errors = validateArticleData(articleEditFormData);
        if (errors.length) {
            return rejectWithValue(errors);
        }
        const nameIndex: string[] = [];

        for (let i = 1; i < articleEditFormData.title.length + 1; i += 1) {
            nameIndex.push(
                articleEditFormData.title.toLowerCase().substring(0, i),
            );
        }

        const Article: newArticle = {
            title: articleEditFormData.title,
            subtitle: articleEditFormData.subtitle,
            img: articleEditFormData.img,
            views: articleEditFormData.views,
            createdAt: articleEditFormData.createdAt,
            type: [ArticleType.ALL, ...articleEditFormData.type],
            blocks: articleEditFormData.blocks,
            user: doc(db, 'users', articleEditFormData.user.id),
            nameIndex,
            userId,
        };
        try {
            await addDoc(collection(db, 'articles'), Article);
            return undefined;
            // const response = await extra.api.post<newArticle>(
            //     `/articles`,
            //     Article,
            // );

            // if (!response.data) {
            //     throw new Error();
            // }

            // return response.data;
        } catch (error) {
            const e = error as Error;
            if (__PROJECT__ === 'frontend') {
                console.log(e);
            }
            return rejectWithValue([ValidateArticleError.SERVER_ERROR]);
        }
    },
);
