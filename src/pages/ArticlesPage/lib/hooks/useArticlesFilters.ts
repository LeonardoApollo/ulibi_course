import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { SortOrder } from '@/shared/types/sort';

import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from '../../model/selectors/getArticlesPage';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import { articlesPageSliceActions } from '../../model/slices/articlePageSlice';

export function useArticlesFilters() {
    const view = useSelector(getArticlesPageView);
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageSliceActions.setView(view));
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (newSort: ArticleSortField) => {
            dispatch(articlesPageSliceActions.setSort(newSort));
            dispatch(articlesPageSliceActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(articlesPageSliceActions.setOrder(newOrder));
            dispatch(articlesPageSliceActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(articlesPageSliceActions.setSearch(search));
            dispatch(articlesPageSliceActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const onChangeType = useCallback(
        (value: ArticleType) => {
            dispatch(articlesPageSliceActions.setType(value));
            dispatch(articlesPageSliceActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    return {
        view,
        sort,
        order,
        search,
        type,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeType,
    };
}
