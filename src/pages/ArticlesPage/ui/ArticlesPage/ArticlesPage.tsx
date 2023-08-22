import { FC, memo, useCallback } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/libs/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/hooks/useInitialEffect';
import { useSelector } from 'react-redux';
import { Page } from 'shared/ui/Page/Page';
import { initArticlePage } from '../../model/services/initArticlePage';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage';
import {
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/getArticlesPage';
import cls from './ArticlesPage.module.scss';
import {
    articlesPageSliceActions,
    articlesPageSliceReducer,
    getArticles,
} from '../../model/slices/articlePageSlice';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageSliceReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageSliceActions.setView(view));
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        if (!isLoading) {
            dispatch(fetchNextArticlesPage());
        }
    }, [dispatch, isLoading]);

    useInitialEffect(() => {
        dispatch(initArticlePage());
    }, [dispatch, view]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                {t('Статьи')}
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
