import { useTranslation } from 'react-i18next';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';

import { ArticleSortField, ArticleType } from '@/entities/Article';

import LoopIcon from '@/shared/assets/icons/LoopRedesigned.svg';
import { classNames } from '@/shared/libs/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    type: ArticleType;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = (props: ArticlesFiltersProps) => {
    const {
        className,
        sort,
        order,
        type,
        search,
        onChangeSearch,
        onChangeOrder,
        onChangeSort,
        onChangeType,
    } = props;

    const { t } = useTranslation('article');

    return (
        <Card
            className={classNames(cls.ArticlesFilters, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t('Поиск')}
                    addonLeft={<Icon Svg={LoopIcon} width={14} height={14} />}
                    data-testid="ArtilesFilter.search"
                />
                <ArticleTypeTabs
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                    data-testid="ArtilesFilter.tabs"
                />
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
};
