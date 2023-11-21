import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';

import { ToggleFeatures } from '@/shared/libs/features';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className } = props;
        const { t } = useTranslation('article');
        const { data, isLoading, error } = useArticleRecommendationsList(3);

        if (isLoading || error || !data) {
            return null;
        }

        return (
            <VStack
                gap="8"
                className={className}
                data-testid="ArticleDetails.Rec"
            >
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Text size="size_l" title={t('Рекоммендуем')} />}
                    off={
                        <TextDeprecated
                            size={TextSize.L}
                            title={t('Рекоммендуем')}
                        />
                    }
                />
                <ArticleList articles={data} target="_blank" />
            </VStack>
        );
    },
);
