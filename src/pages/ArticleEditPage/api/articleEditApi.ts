import { Article } from '@/entities/Article';

import { rtkApi } from '@/shared/api/rtkApi';

interface getArticleData {
    id: string;
    sessionId: number;
}

const articleEditApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleData: build.query<Article, getArticleData>({
            query: ({ id, sessionId }) => ({
                url: `/articles/${id}`,
                params: {
                    _expand: 'user',
                },
            }),
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
