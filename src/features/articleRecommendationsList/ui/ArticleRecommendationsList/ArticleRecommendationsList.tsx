import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';

import { useSideBar } from '@/shared/hooks/useSideBar';
import { useTrackInnerWidth } from '@/shared/hooks/useTrackWindowWidth';
import { ToggleFeatures } from '@/shared/libs/features';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import cls from './ArticleRecommendationsList.module.scss';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className } = props;
        const { SideBarState } = useSideBar();
        const { t } = useTranslation('article');
        const { data, isLoading, error } = useArticleRecommendationsList(3);
        const width = useTrackInnerWidth();
        const closeSideBarWidth =
            // eslint-disable-next-line
            width - 595 > 766 ? 766 : width - 595 < 240 ? 240 : width - 595;
        const openSideBarWidth =
            // eslint-disable-next-line
            width - 756 > 766 ? 766 : width - 756 < 240 ? 240 : width - 756;

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
                <ArticleList
                    width={
                        SideBarState === 'open'
                            ? openSideBarWidth
                            : closeSideBarWidth
                    }
                    className={cls.ArticleRecommendation}
                    articles={data}
                    target="_blank"
                />
            </VStack>
        );
    },
);
