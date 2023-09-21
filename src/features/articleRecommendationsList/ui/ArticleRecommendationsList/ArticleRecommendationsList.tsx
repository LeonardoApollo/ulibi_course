import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const { data, isLoading, error } = useArticleRecommendationsList(3);

    if (isLoading || error || !data) {
        return null;
    }

    return (
        <VStack gap="8" className={className}>
            <Text
                size={TextSize.L}
                title={t('Рекоммендуем')}
            />
            <ArticleList
                articles={data}
                target="_blank"
            />
        </VStack>
    );
});
