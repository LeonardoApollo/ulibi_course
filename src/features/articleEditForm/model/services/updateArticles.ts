import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, updateDoc } from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { db } from '@/shared/config/firebase/firebase';

import { ValidateArticleError } from '../consts/consts';
import { getArticleEditData } from '../selectors/getArticleEditFormData';
import { validateArticleData } from './validateArticleData/validateArticleData';

export const updateArticleData = createAsyncThunk<
    void,
    string,
    ThunkConfig<ValidateArticleError[]>
>(
    'article/updateArticleData',
    async (id, { extra, rejectWithValue, getState }) => {
        const articleEditFormData = getArticleEditData(getState());
        if (!articleEditFormData?.id) {
            throw new Error('article dont exist');
        }

        const errors = validateArticleData(articleEditFormData);
        if (errors.length) {
            return rejectWithValue(errors);
        }

        const nameIndex: string[] = [];

        for (let i = 1; i < articleEditFormData.title.length + 1; i += 1) {
            nameIndex.push(articleEditFormData.title.substring(0, i));
        }

        try {
            await updateDoc(doc(db, 'articles', id), {
                title: articleEditFormData.title,
                subtitle: articleEditFormData.subtitle,
                img: articleEditFormData.img,
                views: articleEditFormData.views,
                createdAt: articleEditFormData.createdAt,
                type: articleEditFormData.type,
                blocks: articleEditFormData.blocks,
                nameIndex,
            });
            return undefined;
            // const response = await extra.api.patch<Article>(
            //     `/articles/${id}`,
            //     updatedArticle,
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
