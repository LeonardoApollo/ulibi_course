import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/getArticlesPage';
import { getArticles } from '../../model/slices/articlePageSlice';

import { ArticleList } from '@/entities/Article';
import { Text } from '@/shared/ui/Text';

interface ArticlesInfiniteListProps {
    className?: string;
}

export const ArticlesInfiniteList = memo(({ className }: ArticlesInfiniteListProps) => {
    const { t } = useTranslation('articles');
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);

    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);

    if (error) {
        return (
            <Text text={t('Ошибка при загрузке статей')} />
        );
    }

    return (
        <ArticleList
            isLoading={isLoading}
            view={view}
            articles={articles}
            className={className}
            target="_self"
        />
    );
});
