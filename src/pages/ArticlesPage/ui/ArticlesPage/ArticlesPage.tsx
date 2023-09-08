import { FC, memo, useCallback } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/libs/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page/Page';
import { useInitialEffect } from 'shared/hooks/useInitialEffect';
import { useSearchParams } from 'react-router-dom';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage';
import {
    getArticlesPageIsLoading, getArticlesPageView,
} from '../../model/selectors/getArticlesPage';
import {
    articlesPageSliceReducer,
} from '../../model/slices/articlePageSlice';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';
import cls from './ArticlesPage.module.scss';
import { initArticlePage } from '../../model/services/initArticlePage';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageSliceReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticlesPageIsLoading);
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
    }, [dispatch, view]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticlesInfiniteList className={cls.list} />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
