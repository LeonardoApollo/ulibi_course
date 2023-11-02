import { memo } from 'react';

import { ArticleViewSelector } from '@/features/ArticleViewSelector';

import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
    ({ className }: ViewSelectorContainerProps) => {
        const { view, onChangeView } = useArticlesFilters();

        return (
            <ArticleViewSelector
                className={className}
                view={view}
                onViewClick={onChangeView}
            />
        );
    },
);
