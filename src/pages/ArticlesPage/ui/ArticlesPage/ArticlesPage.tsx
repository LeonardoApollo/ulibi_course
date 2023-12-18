import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';

import { ArticlePageGreeting } from '@/features/articlePageGreeting';

import { ArticleView } from '@/entities/Article';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/hooks/useInitialEffect';
import { StickyContentLayout } from '@/shared/layout';
import { classNames } from '@/shared/libs/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/libs/features';

import {
    getArticlesPageInited,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/getArticlesPage';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage';
import { initArticlePage } from '../../model/services/initArticlePage';
import {
    articlesPageSliceActions,
    articlesPageSliceReducer,
} from '../../model/slices/articlePageSlice';
import { ArticlesFilterContainer } from '../ArticlesFiltersContainer/ArticlesFilterContainer';
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageSliceReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticlesPageIsLoading);
    const _inited = useSelector(getArticlesPageInited);
    const view = useSelector(getArticlesPageView);
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        if (__PROJECT__ !== 'storybook') {
            if (!isLoading) {
                dispatch(fetchNextArticlesPage());
            }
        }
    }, [dispatch, isLoading]);

    useInitialEffect(() => {
        dispatch(initArticlePage(searchParams));
    }, [dispatch]);

    useInitialEffect(() => {
        if (_inited) {
            dispatch(articlesPageSliceActions.setPage(1));
            dispatch(
                articlesPageSliceActions.setLimit(
                    view === ArticleView.LIST ? 4 : 9,
                ),
            );
            window.scrollTo(0, 0);
            dispatch(fetchArticlesList({ replace: true }));
        }
    }, [dispatch, view]);

    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <StickyContentLayout
                    left={<ViewSelectorContainer />}
                    right={<ArticlesFilterContainer />}
                    content={
                        <Page
                            onScrollEnd={onLoadNextPart}
                            className={classNames(
                                cls.ArticlesPageRedesigned,
                                {},
                                [className],
                            )}
                            data-testid="ArticlesPage"
                        >
                            <ArticlesInfiniteList className={cls.list} />
                            <ArticlePageGreeting />
                        </Page>
                    }
                />
            }
            off={
                <Page
                    onScrollEnd={onLoadNextPart}
                    className={classNames(cls.ArticlesPage, {}, [className])}
                    data-testid="ArticlesPage"
                >
                    <ArticlesPageFilters />
                    <ArticlesInfiniteList className={cls.list} />
                    <ArticlePageGreeting />
                </Page>
            }
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
