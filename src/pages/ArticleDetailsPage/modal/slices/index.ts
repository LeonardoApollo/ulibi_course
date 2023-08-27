import { combineReducers } from '@reduxjs/toolkit';
import { ArticlesDetailsPageSchema } from '../types';
import { articleDetailsPageRecommendationsReducer } from './ArticleDetailsPageRecommendationSlice';
import { articleDetailsCommentsReducer } from './ArticleDetailsCommentsSlice';

export const articleDetailsPageReducer = combineReducers<ArticlesDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationsReducer,
    comments: articleDetailsCommentsReducer,
});
