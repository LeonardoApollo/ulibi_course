import { useTranslation } from 'react-i18next';

import { ArticlesFilters } from '@/widgets/ArticlesFilters';

import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

interface ArticlesFilterContainerProps {
    className?: string;
}

export const ArticlesFilterContainer = ({
    className,
}: ArticlesFilterContainerProps) => {
    const { t } = useTranslation();
    const {
        sort,
        order,
        search,
        type,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeType,
    } = useArticlesFilters();

    return (
        <ArticlesFilters
            className={className}
            sort={sort}
            order={order}
            search={search}
            type={type}
            onChangeSort={onChangeSort}
            onChangeOrder={onChangeOrder}
            onChangeSearch={onChangeSearch}
            onChangeType={onChangeType}
        />
    );
};
