import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';

import { classNames } from '@/shared/libs/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';

import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = memo(
    ({ className }: ArticlesPageFiltersProps) => {
        const { t } = useTranslation('article');
        const {
            onChangeSort,
            onChangeType,
            sort,
            type,
            onChangeSearch,
            search,
            onChangeView,
            view: views,
            onChangeOrder,
            order,
        } = useArticlesFilters();

        return (
            <div
                className={classNames(cls.ArticlesPageFilters, {}, [className])}
            >
                <div className={cls.sortWrapper}>
                    <ArticleViewSelector
                        view={views}
                        onViewClick={onChangeView}
                    />
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
    },
);
