import { StateSchema } from '@/app/providers/StoreProvider';

// eslint-disable-next-line
export const getArticleRecommendationsIsLoading = (state: StateSchema) =>
    state?.articleDetailsPage?.recommendations?.isLoading;
// eslint-disable-next-line
export const getArticleRecommendationsError = (state: StateSchema) =>
    state?.articleDetailsPage?.recommendations?.error;
