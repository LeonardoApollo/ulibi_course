import { Article } from '@/entities/Article';

import { rtkApi } from '@/shared/api/rtkApi';

const articleEditApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleData: build.query<Article, string>({
            query: (id) => ({
                url: `/articles/${id}`,
                params: {
                    _expand: 'user',
                },
            }),
            keepUnusedDataFor: 0,
        }),
        editArticle: build.mutation<void, Article>({
            query: (arg) => ({
                url: `/articles/${arg.id}`,
                method: 'PATCH',
                body: arg,
            }),
        }),
    }),
});

export const useArticleEditApi = articleEditApi.useGetArticleDataQuery;

export const useUpdateArticle = articleEditApi.useEditArticleMutation;
