import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { fetchArticleRecommnedations } from '../services/fetchArticlesRecommendations/fetchArticlesRecommendations';
import { ArticleDetailsRecommendationSchema } from '../types/ArticleDetailsRecommendationSchema';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

const articleDetailsPageRecommendationsSlice = createSlice({
    name: 'ArticleDetailsPageRecommendationsSlice',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationSchema>({
        isLoading: true,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommnedations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleRecommnedations.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticleRecommnedations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: articleDetailsPageRecommendationsReducer,
} = articleDetailsPageRecommendationsSlice;
