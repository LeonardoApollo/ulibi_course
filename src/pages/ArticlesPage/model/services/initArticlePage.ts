import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from '../selectors/getArticlesPage';
import { fetchArticlesList } from './fetchArticlesList';
import { articlesPageSliceActions } from '../slices/articlePageSlice';

export const initArticlePage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlesPage/initArticlePage',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const inited = getArticlesPageInited(getState());

        if (!inited) {
            dispatch(articlesPageSliceActions.initState());
            dispatch(fetchArticlesList({
                page: 1,
            }));
        }
    },
);
