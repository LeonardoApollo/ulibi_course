import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from '../../model/selectors/getArticlesPage';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import { articlesPageSliceActions } from '../../model/slices/articlePageSlice';

import {
    ArticleView,
    ArticleSortField,
    ArticleType,
} from '@/entities/Article';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { classNames } from '@/shared/libs/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';

import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = memo(({ className }: ArticlesPageFiltersProps) => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const views = useSelector(getArticlesPageView);
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((view: ArticleView) => {
        if (views !== view && __PROJECT__ !== 'storybook') {
            dispatch(articlesPageSliceActions.setPage(1));
            dispatch(articlesPageSliceActions.setLimit(view === ArticleView.GRID ? 9 : 4));
            dispatch(articlesPageSliceActions.setView(view));
            dispatch(fetchArticlesList({ replace: true }));
        }
    }, [dispatch, views]);

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageSliceActions.setSort(newSort));
        dispatch(articlesPageSliceActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageSliceActions.setOrder(newOrder));
        dispatch(articlesPageSliceActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((newSearch: string) => {
        dispatch(articlesPageSliceActions.setSearch(newSearch));
        dispatch(articlesPageSliceActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(articlesPageSliceActions.setType(value));
        dispatch(articlesPageSliceActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    return (
        <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleViewSelector view={views} onViewClick={onChangeView} />
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </div>
            <Card className={cls.search}>
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t('Поиск')}
                    data-testid="ArtilesFilter.search"
                />
            </Card>
            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
                className={cls.tabs}
                data-testid="ArtilesFilter.tabs"
            />
        </div>
    );
});
