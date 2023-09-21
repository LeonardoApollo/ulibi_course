import { combineReducers } from '@reduxjs/toolkit';

import { ArticlesDetailsPageSchema } from '../types';

import { articleDetailsCommentsReducer } from './ArticleDetailsCommentsSlice';
import { articleDetailsPageRecommendationsReducer } from './ArticleDetailsPageRecommendationSlice';

export const articleDetailsPageReducer = combineReducers<ArticlesDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationsReducer,
    comments: articleDetailsCommentsReducer,
});
