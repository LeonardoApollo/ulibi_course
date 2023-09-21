import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useArticleRating, useRateArticle } from '../../api/articleRatingApi';

import { getArticleDetailsData } from '@/entities/Article';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text, TextAlign } from '@/shared/ui/Text';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = (props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const userData = useSelector(getUserAuthData);
    const article = useSelector(getArticleDetailsData);
    const { t } = useTranslation('article');
    const { data, isLoading } = useArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });

    const [rateArticleMutation] = useRateArticle();

    const rating = data?.[0];

    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '',
                articleId,
                rate: starsCount,
                feedback,
            });
        } catch (e) {
            console.log(e);
        }
    }, [rateArticleMutation, articleId, userData?.id]);

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount);
    }, [handleRateArticle]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback);
    }, [handleRateArticle]);

    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    if (article?.user.id === userData?.id) {
        return (
            <Card max>
                <Text align={TextAlign.CENTER} title={t('Вы не можете оценить свою статью')} />
            </Card>
        );
    }

    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            className={className}
            title={t('Оцените статью')}
            feedbackTitle={t('Оставьте свой отзыв о статье')}
            hasFeedback
        />
    );
};

export default memo(ArticleRating);
