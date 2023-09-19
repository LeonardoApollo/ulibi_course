import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
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
